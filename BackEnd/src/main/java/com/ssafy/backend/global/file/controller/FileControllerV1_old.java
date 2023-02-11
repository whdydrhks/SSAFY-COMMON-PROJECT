//package com.ssafy.backend.global.file.controller;
//
//import java.io.IOException;
//import java.util.Arrays;
//import java.util.stream.Collectors;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.core.io.Resource;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//
//import com.ssafy.backend.global.file.service.FileService;
//
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@RestController
//@RequiredArgsConstructor
//@Api(tags = "FileController v1")
//@RequestMapping("/v1/file_old")
//public class FileControllerV1_old {
//
//	private static final String IMAGE_USER_PATH = "c:/upload_test/imgs/user/";
//	private static final String IMAGE_ANIMAL_PATH = "c:/upload_test/imgs/animal/";
//
//	private final FileService fileService;
//
//	@PostMapping("/upload")
//	@ApiOperation(value = "파일 업로드")
//	public String uploadFile(
//		@RequestParam("file") MultipartFile source,
//		HttpServletRequest request) {
//
//		log.info("uploadFile");
//
//		String fileName = fileService.storeFile(source);
//
//		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
//			.path("/downloadFile/")
//			.path(fileName)
//			.toUriString();
//
//		return "upload";
//	}
//
//	@PostMapping("/uploadMultiple")
//	@ApiOperation(value = "파일 업로드")
//	public String uploadMultipleFiles(
//		@RequestParam("files") MultipartFile[] files,
//		HttpServletRequest request) {
//
//		Arrays.asList(files)
//			.stream()
//			.map(file -> uploadFile(file, request))
//			.collect(Collectors.toList());
//
//		return "multiple upload";
//	}
//
//	@GetMapping("/download/{fileName:.+}")
//	@ApiOperation(value = "파일 다운로드")
//	public ResponseEntity<?> downloadFile(
//		@PathVariable String fileName,
//		HttpServletRequest request) {
//		// Load file as Resource
//		Resource resource = fileService.loadFileAsResource(fileName);
//
//		// Try to determine file's content type
//		String contentType = null;
//		try {
//			contentType = request.getServletContext().getMimeType(resource.getFile()
//				.getAbsolutePath());
//		} catch (IOException e) {
//			log.info("Could not determine file type.");
//		}
//
//		// Fallback to the default content type if type could not be determined
//		if (contentType == null) {
//			contentType = "application/octet-stream";
//		}
//
//		return ResponseEntity.ok()
//			.contentType(MediaType.parseMediaType(contentType))
//			.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""
//				+ resource.getFilename() + "\"")
//			.body(resource);
//	}
//
//}
