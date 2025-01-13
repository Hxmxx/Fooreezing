interface Ingredient {
    id: number; // 식재료 고유 아이디
    name: string; // 이름
    category: FoodCategory; // 카테고리
    expiryDate: Date;  // 유통기한
    quantity: number; // 수량
    unit: Unit; // 단위
    imageUrl?: string; // 이미지 경로
    nutritionInfo: NutritionInfo; // 영양 정보
    storageType?: 'Refrigerated' | 'Frozen' | 'RoomTemperature'; // 보관 방법 (냉장, 냉동, 실온)
    purchaseDate: Date;  // 구매 일자 추가
    memo?: string;       // 사용자 메모 추가
    isOpened: boolean;   // 개봉 여부
    openedDate?: Date;   // 개봉 일자
    alertThreshold?: number; // 알림 설정 임계값 (유통기한 몇일 전)
}

enum FoodCategory {
    VEGETABLE,  // 채소
    FRUIT,      // 과일
    MEAT,       // 육류
    DAIRY,      // 유제품
    SEAFOOD,    // 해산물
    CONDIMENT,  // 양념
    GRAINS,     // 곡물
    BEVERAGE,   // 음료
    PROCESSED,  // 가공식품
    SNACK,      // 과자/간식 추가
    SAUCE,      // 소스 추가
    FROZEN_FOOD // 냉동식품 추가
}

enum Unit {
    PIECE,      // 개
    GRAM,       // g
    MILLILITER, // ml
    LITER,      // l
    PACK,       // 팩
    SERVING,    // 인분 추가
    BOX,        // 상자 추가
    KILOGRAM    // kg 추가
}

interface NutritionInfo {
    calories: number; // 칼로리 (kcal)
    protein: number; // 단백질 (g)
    fat: number; // 지방 (g)
    carbs: number; // 탄수화물 (g)
    sodium?: number;     // 나트륨 (mg)
    sugar?: number;      // 당류 (g)
    servingSize: number; // 1회 제공량
}