package com.ssafy.backend.global.file.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.repository.AnimalRepository;
import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.global.common.model.response.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.error.exception.FileErrorException;
import com.ssafy.backend.global.file.entity.FileEntity;
import com.ssafy.backend.global.file.repository.FileRepository;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileService {

	private final ResponseUtil responseUtil;

	private final FileRepository fileRepository;
	private final UserRepository userRepository;
	private final AnimalRepository animalRepository;

	@Value("${file.upload.basicPath}")
	private String UPLOAD_DIR_PATH;

	@Value("${file.upload.userPath}")
	public String USER_SUB_PATH = "user";

	@Value("${file.upload.animalPath}")
	public String ANIMAL_SUB_PATH = "animal";

	private FileEntity userDefault;
	private FileEntity animalDefault;

	@Transactional
	public String uploadUserFile(
		Long userId,
		MultipartFile source,
		HttpServletRequest request) {

		//		LocalDateTime timeStamp = LocalDateTime.now();

		UserEntity fileUser = userRepository.findByIdAndExpiredLike(userId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		FileEntity findFile = fileRepository.findByUser(fileUser).orElse(null);

		// GNU/Linux, Windows에서는 문제 없음
		// MAC은 Normalizer를 추가로 사용해 NFC형태로 정규화 해야함
		String fileOriginName = StringUtils.cleanPath(source.getOriginalFilename());

		String fileName = StringUtils.stripFilenameExtension(fileOriginName);
		String fileExt = StringUtils.getFilenameExtension(fileOriginName).toLowerCase();
		String fileType = URLConnection.guessContentTypeFromName(fileOriginName);

		String storeName = fileUser.getId().toString();

		log.info("fileOriginName : " + fileOriginName
			+ "\nfileName : " + fileName
			+ "\nfileType : " + fileExt
			+ "\nstoreName : " + storeName);

		FileEntity uploadFile = null;

		if (findFile == null) {
			uploadFile = FileEntity.builder()
				.user(fileUser)
				.originName(fileName)
				.extension(fileExt)
				.contentType(fileType)
				.storeName(storeName)
				.build();
		} else {
			uploadFile = FileEntity.builder()
				.id(findFile.getId())
				.user(fileUser)
				.originName(fileName)
				.extension(fileExt)
				.contentType(fileType)
				.storeName(storeName)
				.expired(findFile.getExpired())
				.createdDate(findFile.getCreatedDate())
				.build();
		}

		storeFile(source, USER_SUB_PATH, fileName, storeName);

		fileRepository.save(uploadFile);
		System.out.println("=============3");

		return createDownloadUri(USER_SUB_PATH, uploadFile);
	}

	@Transactional
	public String uploadAnimalFile(
		Long animalId,
		MultipartFile source,
		HttpServletRequest request) {

		AnimalEntity fileAnimal = animalRepository.findByIdAndExpiredLike(animalId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		// GNU/Linux, Windows에서는 문제 없음
		// MAC은 Normalizer를 추가로 사용해 NFC형태로 정규화 해야함
		String fileOriginName = StringUtils.cleanPath(source.getOriginalFilename());

		String fileName = StringUtils.stripFilenameExtension(fileOriginName);
		String fileExt = StringUtils.getFilenameExtension(fileOriginName).toLowerCase();
		String fileType = URLConnection.guessContentTypeFromName(fileOriginName);

		LocalDateTime now = LocalDateTime.now();
		String timeStamp = now.format(DateTimeFormatter.ofPattern("yyMMdd_HHmmssSSS"));

		String storeName = timeStamp + "_" + Integer.toHexString(fileName.hashCode());

		log.info("fileOriginName : " + fileOriginName
			+ "\nfileName : " + fileName
			+ "\nfileType : " + fileExt
			+ "\nstoreName : " + storeName);

		FileEntity uploadFile = FileEntity.builder()
			.animal(fileAnimal)
			.originName(fileName)
			.extension(fileExt)
			.contentType(fileType)
			.storeName(storeName)
			.build();

		storeFile(source, ANIMAL_SUB_PATH, fileName, storeName);

		fileRepository.save(uploadFile);

		return createDownloadUri(ANIMAL_SUB_PATH, uploadFile);
	}

	@Transactional
	public ResponseSuccessDto<?> uploadFile(
		String category,
		Long id,
		MultipartFile file,
		HttpServletRequest request) {

		String fileDownloadUri = "null";

		if ("user".equals(category)) {
			fileDownloadUri = uploadUserFile(id, file, request);
		} else if ("animal".equals(category)) {
			fileDownloadUri = uploadAnimalFile(id, file, request);
		} else {
			throw new FileErrorException(ApiStatus.FILE_INVALID_PATH);
		}

		return responseUtil.buildSuccessResponse(fileDownloadUri);
	}

	@Transactional
	public ResponseSuccessDto<?> uploadMultipleFiles(
		String category,
		Long id,
		List<MultipartFile> files,
		HttpServletRequest request) {

		List<?> fileDownloadUriList;

		if ("user".equals(category)) {
			fileDownloadUriList = files
				.stream()
				.map(file -> uploadUserFile(id, file, request))
				.collect(Collectors.toList());
		} else if ("animal".equals(category)) {
			fileDownloadUriList = files
				.stream()
				.map(file -> uploadAnimalFile(id, file, request))
				.collect(Collectors.toList());
		} else {
			throw new FileErrorException(ApiStatus.FILE_INVALID_PATH);
		}

		return responseUtil.buildSuccessResponse(fileDownloadUriList);
	}

	@Transactional
	public ResponseSuccessDto<?> updateExpire(
		String category,
		String fileName,
		Boolean expiredFlag,
		HttpServletRequest request) {

		String storeName = StringUtils.stripFilenameExtension(fileName);

		FileEntity findFile = fileRepository.findByStoreName(storeName)
			.orElseThrow(() -> new FileErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		// 기본파일 프로필 이미지 삭제를 막기위한 예외
		if (findFile.getStoreName().contains("default")) {
			throw new FileErrorException(ApiStatus.FILE_INVALID_PATH);
		}

		FileEntity updateFile = FileEntity.builder()
			.id(findFile.getId())
			.user(findFile.getUser())
			.animal(findFile.getAnimal())
			.originName(findFile.getOriginName())
			.storeName(findFile.getStoreName())
			.extension(findFile.getExtension())
			.contentType(findFile.getContentType())
			.expired(expiredFlag ? "T" : "F")
			.createdDate(findFile.getCreatedDate())
			.build();

		Long updatedFileId = fileRepository.save(updateFile).getId();

		return responseUtil.buildSuccessResponse(updatedFileId);
	}

	@Transactional
	public void deleteFile(Long fileId) {

		fileRepository.deleteById(fileId);
	}

	@Transactional
	public ResponseEntity<?> loadFile(
		String subPath,
		String requestFile,
		HttpServletRequest request) {

		String requestFileName = StringUtils.stripFilenameExtension(requestFile);

		FileEntity findFile = fileRepository.findByStoreNameAndExpiredLike(requestFileName, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		Resource resource = null;

		try {
			Path filePath = Paths.get(UPLOAD_DIR_PATH)
				.toAbsolutePath()
				.resolve(subPath)
				.resolve(findFile.getStoreName())
				.normalize();

			resource = new UrlResource(filePath.toUri());

			if (!resource.exists()) {
				throw new FileErrorException(ApiStatus.FILE_NOT_DOWNLOAD, findFile.getStoreName());
			}
		} catch (MalformedURLException ex) {
			throw new FileErrorException(ApiStatus.FILE_NOT_DOWNLOAD, findFile.getStoreName());
		}

		String contentType = "application/octet-stream";

		contentType = findFile.getContentType();

		return ResponseEntity.ok()
			.contentType(MediaType.parseMediaType(contentType))
			//			.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""
			//				+ resource.getFilename() + "." + fileExt + "\"")
			.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""
				+ findFile.getOriginName() + "." + findFile.getExtension() + "\"")
			.body(resource);
	}

	@Transactional
	public ResponseSuccessDto<?> getFilesByUser(
		Long userId,
		HttpServletRequest request) {

		UserEntity findUser = userRepository.findByIdAndExpiredLike(userId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		// 사용자 이미지를 찾지 못하면 userDefault 이미지를 불러옴
		FileEntity findFile = fileRepository.findByUserAndExpiredLike(findUser, "F")
			.orElse(fileRepository.findByStoreName("default_profile").get());

		String fileDownloadUri = createDownloadUri(USER_SUB_PATH, findFile);

		return responseUtil.buildSuccessResponse(fileDownloadUri);
	}

	@Transactional
	public ResponseSuccessDto<?> getFilesByAnimal(
		Long animalId,
		HttpServletRequest request) {

		AnimalEntity findAnimal = animalRepository.findByIdAndExpiredLike(animalId, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		// 사용자 이미지를 찾지 못하면 userDefault 이미지를 불러옴
		List<FileEntity> findFiles = fileRepository.findByAnimalAndExpiredLike(findAnimal, "F");

		if (findFiles.isEmpty()) {
			findFiles = Arrays.asList(fileRepository.findByStoreName("default_profile").get());
		}

		List<?> fileDownloadUriList = findFiles
			.stream()
			.map(findFile -> createDownloadUri(ANIMAL_SUB_PATH, findFile))
			.collect(Collectors.toList());

		return responseUtil.buildSuccessResponse(fileDownloadUriList);
	}

	@Transactional
	private String storeFile(MultipartFile file, String subPath, String fileName, String storeName) {

		Path fileStoragePath = createDirectories(subPath);

		try {
			if (fileName.contains("..")) {
				throw new FileErrorException(ApiStatus.FILE_INVALID_PATH, fileName);
			}

			Path targetLocation = fileStoragePath.resolve(storeName).normalize();

			System.out.println("path : " + targetLocation.toString());

			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return targetLocation.toString();

		} catch (IOException e) {
			e.printStackTrace();
			throw new FileErrorException(ApiStatus.FILE_NOT_UPLOAD, fileName);
		}
	}

	/**
	 * 파일 다운로드 패스를 만드는 메소드
	 *
	 * @param
	 * @return
	 */
	@Transactional
	public String createDownloadUri(String subPath, FileEntity file) {
		return ServletUriComponentsBuilder.fromCurrentContextPath()
			.path("/v1/file")
			.path("/download").path("/" + subPath)
			.path("/" + file.getStoreName()).path("." + file.getExtension())
			.toUriString();
	}

	/**
	 * subPath를 받아 디렉토리를 생성하는 메소드
	 *
	 * @param
	 * @return Path
	 */
	@Transactional
	private Path createDirectories(String subPath) {
		Path fileStoragePath = Paths.get(UPLOAD_DIR_PATH)
			.toAbsolutePath()
			.resolve(subPath)
			.normalize();

		try {
			Files.createDirectories(fileStoragePath);

			return fileStoragePath;
		} catch (Exception e) {
			e.printStackTrace();
			throw new FileErrorException(ApiStatus.NOT_CREATE_DIRECTORY);
		}
	}

}
