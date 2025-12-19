package com.back.global.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Component
public class FileStorage {
    private final Path uploadDir;

    // 예: application.yml에 app.upload-dir: uploads
    public FileStorage(@Value("${app.upload-dir:uploads}") String uploadDir) {
        this.uploadDir = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    public String saveItemImage(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;

        // 간단한 확장자 화이트리스트
        String original = StringUtils.cleanPath(file.getOriginalFilename() == null ? "" : file.getOriginalFilename());
        String ext = getExt(original);
        Set<String> allowed = Set.of("png", "jpg", "jpeg", "webp");
        if (!allowed.contains(ext)) {
            throw new IllegalArgumentException("이미지 확장자는 png/jpg/jpeg/webp 만 가능합니다.");
        }

        try {
            Files.createDirectories(uploadDir);

            String savedName = UUID.randomUUID() + "." + ext;
            Path target = uploadDir.resolve(savedName);

            // 덮어쓰기 방지
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            // ✅ DB에 저장할 값: URL 또는 path
            // 여기서는 정적 서빙을 /uploads/** 로 한다고 가정하고 URL을 만들어 반환
            return "/uploads/" + savedName;
        } catch (IOException e) {
            throw new RuntimeException("파일 저장에 실패했습니다.", e);
        }
    }

    public void deleteByImageUrl(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) return;
        // imageUrl = "/uploads/xxx.png"
        String filename = imageUrl.replace("/uploads/", "");
        try {
            Files.deleteIfExists(uploadDir.resolve(filename));
        } catch (IOException e) {
            // 삭제 실패는 치명적이지 않게 로그로만 처리하는 경우가 많음
            // 여기서는 단순히 런타임 예외로 처리
            throw new RuntimeException("파일 삭제에 실패했습니다.", e);
        }
    }

    private String getExt(String filename) {
        int dot = filename.lastIndexOf('.');
        if (dot < 0) return "";
        return filename.substring(dot + 1).toLowerCase();
    }

}
