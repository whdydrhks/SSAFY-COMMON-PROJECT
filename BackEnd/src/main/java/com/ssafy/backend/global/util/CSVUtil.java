package com.ssafy.backend.global.util;

import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CSVUtil {

	public List<CSVRecord> readCSV(String dir, String filename) {
		log.info("[Util Call] " + this.getClass().getName() + " - readCSV");
		// CSV 포맷 세팅
		CSVFormat format = CSVFormat.RFC4180.builder()
			.setHeader()
			.setDelimiter(",")
			.build();

		List<CSVRecord> records = new ArrayList<>();

		// CSV 파서 세팅
		try {
			Path filePath = Paths.get(dir)
				.toAbsolutePath()
				.resolve(filename)
				.normalize();

			log.info(filePath.toString());

			CSVParser parser = CSVParser.parse(filePath.toFile(), Charset.forName("euc-kr"), format);

			records = parser.getRecords();

		} catch (Exception e) {
			// TODO: handle exception
		}

		return records;

		//		// records 조회 테스트 명령어
		//		for (int i = 0; i < records.size(); i++) {
		//
		//			CSVRecord record = records.get(i);
		//			int size = record.size();
		//
		//			for (int j = 0; j < size; j++) {
		//				System.out.print(record.get(j));
		//			}
		//			System.out.println();
		//		}

	}

	public List<CSVRecord> readClasspathCSV(String dir, String filename) {
		log.info("[Util Call] " + this.getClass().getName() + " - readClasspathCSV");
		// CSV 포맷 세팅
		CSVFormat format = CSVFormat.RFC4180.builder()
			.setHeader()
			.setDelimiter(",")
			.build();

		List<CSVRecord> records = new ArrayList<>();

		// CSV 파서 세팅
		try {
			Resource resource = new ClassPathResource(dir + File.separator + filename);
			log.info(resource.getURI().getPath());

			InputStream inputStream = resource.getInputStream();

			Reader reader = new InputStreamReader(inputStream, "euc-kr"); //utf-8, euc-kr
			CSVParser parser = CSVParser.parse(reader, format);

			//			CSVParser parser = CSVParser.parse(resource.getFile(), Charset.forName("euc-kr"), format);

			records = parser.getRecords();

		} catch (Exception e) {
			// TODO: handle exception
		}

		return records;
	}

}
