// 에러 메시지 처리 유틸리티

// 단일 오류 메시지를 한글로 변환
export const translateSingleError = (msg: string): string => {
  if (!msg) return "";
  
  // 백엔드 validation 메시지 변환
  if (msg.includes("email-NotBlank") || msg.includes("공백일 수 없습니다")) {
    return "이메일을 입력해주세요";
  }
  if (msg.includes("email-Email") || msg.includes("이메일 형식")) {
    return "이메일 형식이 올바르지 않습니다";
  }
  if (msg.includes("address-NotBlank")) {
    return "주소를 입력해주세요";
  }
  if (msg.includes("postcode-NotBlank")) {
    return "우편번호를 입력해주세요";
  }
  if (msg.includes("orderItems-NotEmpty") || msg.includes("비어 있을 수 없습니다")) {
    return "주문 항목이 비어있을 수 없습니다";
  }
  if (msg.includes("주문 상세 조회 실패")) {
    return "주문 상세 정보를 불러오는데 실패했습니다";
  }
  if (msg.includes("주문 목록 조회 실패")) {
    return "주문 목록을 불러오는데 실패했습니다";
  }
  if (msg.includes("주문 수정 실패")) {
    return "주문 수정에 실패했습니다";
  }
  if (msg.includes("주문 삭제 실패")) {
    return "주문 삭제에 실패했습니다";
  }
  
  // 그 외 메시지는 그대로 반환 (이미 한글이거나 다른 형식)
  return msg;
};

// 오류 메시지를 파싱하여 배열로 변환 (여러 오류 처리)
export const parseErrorMessages = (error: any): string[] => {
  if (!error) return [];
  
  let messages: string[] = [];
  
  // 배열 형태인 경우
  if (Array.isArray(error.errors)) {
    messages = error.errors.map((e: string) => translateSingleError(e));
  }
  // msg가 배열인 경우
  else if (Array.isArray(error.msg)) {
    messages = error.msg.map((m: string) => translateSingleError(m));
  }
  // 문자열인 경우 - 콤마, 줄바꿈, 세미콜론으로 구분된 여러 오류 파싱
  else if (typeof error.msg === "string" || typeof error.message === "string") {
    const msg = error.msg || error.message || "";
    // 콤마, 줄바꿈, 세미콜론으로 분리
    const parts = msg.split(/[,;\n]/).map((s: string) => s.trim()).filter((s: string) => s);
    
    if (parts.length > 1) {
      // 여러 오류가 있는 경우
      messages = parts.map((p: string) => translateSingleError(p));
    } else {
      // 단일 오류인 경우
      messages = [translateSingleError(msg)];
    }
  }
  // 그 외 경우
  else {
    const msg = error.msg || error.message || "오류가 발생했습니다";
    messages = [translateSingleError(msg)];
  }
  
  // 중복 제거
  return Array.from(new Set(messages)).filter((m) => m);
};

