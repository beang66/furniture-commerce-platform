export type SpaceId = 'all' | 'living' | 'bedroom' | 'kitchen'
export type StyleId = 'minimal-wood' | 'mid-century' | 'vintage'

export const SPACES: { id: SpaceId; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'living', label: '거실' },
  { id: 'bedroom', label: '침실' },
  { id: 'kitchen', label: '주방' },
]

export const STYLES: { id: StyleId; label: string }[] = [
  { id: 'minimal-wood', label: '미니멀 우드' },
  { id: 'mid-century', label: '미드센추리 모던' },
  { id: 'vintage', label: '빈티지' },
]

export const ROOM_SCENES: Record<Exclude<SpaceId, 'all'>, string> = {
  living: '/rooms/living.png',
  bedroom: '/rooms/bedroom.png',
  kitchen: '/rooms/kitchen.png',
}

export type ProductOption = {
  id: string
  label: string
  swatch: string
  extra: number
}

export type Product = {
  id: string
  name: string
  brand: string
  designer: string
  price: number
  originalPrice?: number
  space: Exclude<SpaceId, 'all'>
  style: StyleId
  image: string
  materials: string[]
  dimensions: { w: number; d: number; h: number }
  rating: number
  reviews: number
  tags: string[]
  description: string
  stylingTip: string
  options: ProductOption[]
  badge?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'oslo-sofa',
    name: '오슬로 3인 패브릭 소파',
    brand: 'NORDHAUS',
    designer: 'Ingrid Solberg',
    price: 1890000,
    originalPrice: 2190000,
    space: 'living',
    style: 'minimal-wood',
    image: '/products/oslo-sofa.png',
    materials: ['벨기에 리넨', '오크 원목', '고밀도 폼'],
    dimensions: { w: 2200, d: 900, h: 720 },
    rating: 4.8,
    reviews: 214,
    tags: ['따뜻한 뉴트럴', '로우 라운지', '거실 중심 배치'],
    description:
      '낮은 시트 높이와 넉넉한 깊이로 거실의 시선을 아래로 내려주는 로우 라운지 소파입니다. 오트밀 리넨과 오크 레그의 조합이 공간의 온도를 부드럽게 올려줍니다.',
    stylingTip:
      '벽에서 20cm 정도 띄워 배치하고 뒤에 키 큰 올리브 나무를 두면 거실의 깊이감이 살아납니다.',
    options: [
      { id: 'oatmeal', label: '오트밀 리넨', swatch: '#d9cdba', extra: 0 },
      { id: 'olive', label: '올리브 코튼', swatch: '#6b7358', extra: 90000 },
      { id: 'stone', label: '스톤 그레이', swatch: '#9a958d', extra: 60000 },
    ],
    badge: 'BEST',
  },
  {
    id: 'nord-lounge-chair',
    name: '노르드 라운지 체어',
    brand: 'ATELIER 62',
    designer: 'Paul Rehn',
    price: 940000,
    space: 'living',
    style: 'mid-century',
    image: '/products/nord-lounge-chair.png',
    materials: ['월넛 원목', '울 부클레', '천연 오일 마감'],
    dimensions: { w: 760, d: 820, h: 780 },
    rating: 4.9,
    reviews: 132,
    tags: ['미드센추리', '포인트 컬러', '창가 코너'],
    description:
      '1950년대 스칸디나비아 라운지 체어의 비율을 현대적으로 다듬었습니다. 딥 에메랄드 울 패브릭이 우드 톤 공간에 자연스러운 포인트를 만듭니다.',
    stylingTip:
      '창가에 45도로 살짝 틀어 배치하고 낮은 사이드 테이블과 조명을 함께 두면 독립적인 리딩 코너가 완성됩니다.',
    options: [
      { id: 'emerald', label: '에메랄드 울', swatch: '#2f5d4c', extra: 0 },
      { id: 'camel', label: '카멜 레더', swatch: '#a5764a', extra: 180000 },
    ],
    badge: 'NEW',
  },
  {
    id: 'oak-dining-table',
    name: '오크 확장형 다이닝 테이블',
    brand: 'FORM & GRAIN',
    designer: 'Studio Haneul',
    price: 1450000,
    space: 'kitchen',
    style: 'minimal-wood',
    image: '/products/oak-dining-table.png',
    materials: ['화이트 오크 집성목', '무광 우레탄'],
    dimensions: { w: 1600, d: 850, h: 740 },
    rating: 4.7,
    reviews: 189,
    tags: ['확장 버터플라이', '4~6인', '주방 아일랜드 매치'],
    description:
      '버터플라이 확장 구조로 1600mm에서 2000mm까지 늘어나는 다이닝 테이블입니다. 결이 곧은 화이트 오크를 사용해 시간이 지날수록 톤이 깊어집니다.',
    stylingTip:
      '테이블 폭보다 60~70% 좁은 펜던트 조명을 테이블 상판에서 750mm 높이에 매달면 비율이 안정적입니다.',
    options: [
      { id: 'natural', label: '내추럴 오크', swatch: '#c8a77c', extra: 0 },
      { id: 'smoked', label: '스모크 오크', swatch: '#8a6b4e', extra: 120000 },
    ],
  },
  {
    id: 'rattan-dining-chair',
    name: '라탄 티크 다이닝 체어',
    brand: 'MAISON OLIVE',
    designer: 'Camille Blanc',
    price: 268000,
    space: 'kitchen',
    style: 'vintage',
    image: '/products/rattan-dining-chair.png',
    materials: ['티크 원목', '천연 라탄 케인'],
    dimensions: { w: 480, d: 520, h: 810 },
    rating: 4.6,
    reviews: 341,
    tags: ['빈티지 무드', '통기성 시트', '2개 이상 추천'],
    description:
      '손으로 엮은 라탄 케인 등받이와 티크 프레임이 만드는 클래식한 실루엣. 가벼워 이동이 쉽고 좁은 주방에서도 부담이 없습니다.',
    stylingTip:
      '동일한 체어 4개보다 2개 + 벤치 조합으로 배치하면 캐주얼한 빈티지 다이닝 무드가 살아납니다.',
    options: [
      { id: 'honey', label: '허니 티크', swatch: '#b98b55', extra: 0 },
      { id: 'ebony', label: '에보니 스테인', swatch: '#4a3a2c', extra: 20000 },
    ],
  },
  {
    id: 'linen-bed',
    name: '리넨 헤드보드 로우 베드',
    brand: 'NORDHAUS',
    designer: 'Ingrid Solberg',
    price: 1290000,
    originalPrice: 1490000,
    space: 'bedroom',
    style: 'minimal-wood',
    image: '/products/linen-bed.png',
    materials: ['워싱 리넨', '오크 원목 프레임'],
    dimensions: { w: 1620, d: 2100, h: 900 },
    rating: 4.9,
    reviews: 276,
    tags: ['로우 프레임', '퀸 사이즈', '침실 미니멀'],
    description:
      '시선을 낮춰 침실을 넓어 보이게 하는 로우 프레임 베드. 워싱 리넨 헤드보드는 커버 분리 세탁이 가능합니다.',
    stylingTip:
      '헤드보드 양옆에 서로 다른 높이의 나이트 스탠드를 두면 정적인 침실에 리듬이 생깁니다.',
    options: [
      { id: 'greige', label: '그레이지 리넨', swatch: '#b8ada0', extra: 0 },
      { id: 'ivory', label: '아이보리 리넨', swatch: '#e2dbcd', extra: 0 },
      { id: 'forest', label: '포레스트 리넨', swatch: '#4a5b47', extra: 80000 },
    ],
    badge: 'SALE',
  },
  {
    id: 'teak-armchair',
    name: '빈티지 티크 암체어',
    brand: 'ARCHIVE 1962',
    designer: 'Restored Piece',
    price: 720000,
    space: 'bedroom',
    style: 'vintage',
    image: '/products/teak-armchair.png',
    materials: ['티크 원목', '베지터블 탠 레더'],
    dimensions: { w: 700, d: 750, h: 760 },
    rating: 4.5,
    reviews: 88,
    tags: ['리스토어 빈티지', '탠 레더', '침실 코너'],
    description:
      '1960년대 티크 암체어를 국내 공방에서 리스토어했습니다. 사용감이 남은 레더 표면이 공간에 시간의 결을 더합니다.',
    stylingTip:
      '침실 창가 코너에 두고 리넨 스로우를 걸쳐두면 호텔 스위트룸 같은 여백이 생깁니다.',
    options: [
      { id: 'tan', label: '탠 레더', swatch: '#a9744d', extra: 0 },
      { id: 'chocolate', label: '초콜릿 레더', swatch: '#5c4030', extra: 60000 },
    ],
  },
  {
    id: 'walnut-sideboard',
    name: '월넛 슬라이딩 사이드보드',
    brand: 'ATELIER 62',
    designer: 'Paul Rehn',
    price: 1120000,
    space: 'living',
    style: 'mid-century',
    image: '/products/walnut-sideboard.png',
    materials: ['월넛 무늬목', '브라스 하드웨어'],
    dimensions: { w: 1800, d: 450, h: 720 },
    rating: 4.7,
    reviews: 154,
    tags: ['수납 1800mm', 'TV 보드 겸용', '브라스 디테일'],
    description:
      '슬라이딩 도어로 문이 열리는 공간을 아끼는 사이드보드. 케이블 홀이 있어 TV 보드로도 활용할 수 있습니다.',
    stylingTip:
      '상판에는 오브제를 3개 이하로, 서로 다른 높이로 배치하면 미드센추리 무드가 정돈되어 보입니다.',
    options: [
      { id: 'walnut', label: '월넛', swatch: '#6b4630', extra: 0 },
      { id: 'oak', label: '오크', swatch: '#c19a6b', extra: 0 },
    ],
  },
]

export function formatKRW(value: number) {
  return `₩${value.toLocaleString('ko-KR')}`
}

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}
