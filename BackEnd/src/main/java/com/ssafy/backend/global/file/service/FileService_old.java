//package com.ssafy.backend.global.file.service;
//
//import java.io.IOException;
//import java.net.MalformedURLException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;
//
//import javax.annotation.PostConstruct;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.io.Resource;
//import org.springframework.core.io.UrlResource;
//import org.springframework.stereotype.Service;
//import org.springframework.util.StringUtils;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.ssafy.backend.global.error.exception.FileErrorException;
//import com.ssafy.backend.global.file.repository.FileRepository;
//import com.ssafy.backend.global.util.enums.ApiStatus;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class FileService_old {
//
//	private FileRepository fileRepositroy;
//
//	@Value("${file.uploadDir}")
//	private String uploadDir;
//
//	private Path fileStoragePath;
//
//	@PostConstruct
//	public void initStoragePath() {
//		this.fileStoragePath = Paths.get(uploadDir)
//			.toAbsolutePath()
//			.normalize();
//
//		try {
//			Files.createDirectories(this.fileStoragePath);
//		} catch (Exception e) {
//			throw new FileErrorException(ApiStatus.NOT_CREATE_DIRECTORY);
//		}
//
//	}
//
//	public String storeFile(MultipartFile file) {
//
//		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//
//		try {
//			if (fileName.contains("..")) {
//				throw new FileErrorException(ApiStatus.FILE_INVALID_PATH, fileName);
//			}
//
//			Path targetLocation = this.fileStoragePath.resolve(fileName);
//			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
//
//			return fileName;
//
//		} catch (IOException e) {
//			e.printStackTrace();
//			throw new FileErrorException(ApiStatus.FILE_NOT_UPLOAD, fileName);
//		}
//	}
//
//	public Resource loadFileAsResource(String fileName) {
//		try {
//			Path filePath = this.fileStoragePath.resolve(fileName).normalize();
//
//			Resource resource = new UrlResource(filePath.toUri());
//			if (resource.exists()) {
//				return resource;
//			} else {
//				throw new FileErrorException(ApiStatus.FILE_NOT_DOWNLOAD, fileName);
//			}
//		} catch (MalformedURLException ex) {
//			throw new FileErrorException(ApiStatus.FILE_NOT_DOWNLOAD, fileName);
//		}
//	}
//
//}
