import { BreedSize, Species } from "@prisma/client";
import { EXTRA_BREEDS } from "./breeds-extra";

/**
 * Catalogue giống — khách đặt cọc để shop tìm bé theo yêu cầu.
 * `name` phải khớp với `Product.breed` để đếm được "Đang có N bé".
 * `careGuide` là nội dung gốc cho trang /cham-soc, không sao chép nguồn khác.
 * Các chỉ số tính cách (1-5) và `suitability`/`careNotes` phục vụ trang
 * chi tiết giống /breed-detail.
 */
export interface BreedSeed {
  name: string;
  slug: string;
  alias?: string;
  description: string;
  species: Species;
  size: BreedSize;
  weightRange?: string;
  priceMin: number;
  priceMax: number;
  image: string;
  images: string[];
  tags: string[];
  careGuide: string[];
  suitability: string;
  careNotes: string;
  /** Cảnh báo ngắn hiển thị nổi bật ở trang chi tiết; bỏ trống nếu không có. */
  warning?: string;
  energyLevel: number;
  apartmentFriendly: number;
  kidFriendly: number;
  petFriendly: number;
  sheddingLevel: number;
  groomingNeeds: number;
  trainability: number;
  barkingLevel: number;
  position: number;
}

/** 12 giống nền tảng shop bán thường xuyên nhất. */
const CORE_BREEDS: BreedSeed[] = [
  {
    name: "Poodle",
    slug: "poodle",
    alias: "Toy / Tiny Poodle",
    description:
      "Bộ lông xoăn mềm không rụng, thông minh xuất chúng và học hỏi cực nhanh. Vóc dáng nhỏ gọn hợp căn hộ, luôn quấn quýt bên chủ.",
    species: Species.DOG,
    size: BreedSize.SMALL,
    weightRange: "3-5kg",
    priceMin: 6000000,
    priceMax: 25000000,
    image: "/breeds/poodle-1.jpg",
    images: ["/breeds/poodle-1.jpg", "/breeds/poodle-2.jpg", "/breeds/poodle-3.jpg", "/breeds/poodle-4.jpg"],
    tags: ["Thông minh", "dễ huấn luyện"],
    careGuide: [
      "Chải lông 2-3 lần/tuần để tránh rối, cắt tỉa mỗi 4-6 tuần.",
      "Cần vận động nhẹ 20-30 phút mỗi ngày, thích hợp trò chơi trí tuệ.",
      "Kiểm tra tai thường xuyên vì lông trong tai dễ gây ẩm, viêm.",
    ],
    suitability:
      "Phù hợp gia đình sống trong căn hộ, người mới nuôi chó lần đầu vì Poodle rất dễ dạy và gần như không rụng lông.",
    careNotes:
      "Cần chải lông 2-3 lần/tuần và cắt tỉa định kỳ mỗi 4-6 tuần để tránh lông rối; nên có 20-30 phút vận động trí tuệ mỗi ngày.",
    energyLevel: 4,
    apartmentFriendly: 5,
    kidFriendly: 4,
    petFriendly: 4,
    sheddingLevel: 1,
    groomingNeeds: 5,
    trainability: 5,
    barkingLevel: 3,
    position: 0,
  },
  {
    name: "Corgi",
    slug: "corgi",
    alias: "Pembroke Welsh Corgi",
    description:
      "Chân ngắn, mông tròn và nụ cười thường trực. Corgi năng động, rất quấn chủ và hoà đồng với trẻ nhỏ.",
    species: Species.DOG,
    size: BreedSize.MEDIUM,
    weightRange: "10-14kg",
    priceMin: 11000000,
    priceMax: 35000000,
    image: "/breeds/corgi-1.jpg",
    images: ["/breeds/corgi-1.jpg", "/breeds/corgi-2.jpg", "/breeds/corgi-3.jpg", "/breeds/corgi-4.jpg"],
    tags: ["Vui vẻ", "quấn chủ"],
    careGuide: [
      "Vận động đều đặn 30-45 phút/ngày để tránh tăng cân do thân dài chân ngắn.",
      "Hạn chế cho leo cầu thang hoặc nhảy cao để bảo vệ cột sống.",
      "Rụng lông theo mùa khá nhiều, nên chải lông 2-3 lần/tuần.",
    ],
    suitability:
      "Phù hợp gia đình có trẻ nhỏ và người có thời gian dắt bé vận động mỗi ngày; sống tốt trong căn hộ nếu được ra ngoài thường xuyên.",
    careNotes:
      "Hạn chế cho bé leo cầu thang hoặc nhảy từ trên cao để bảo vệ cột sống; chải lông 2-3 lần/tuần vì rụng lông khá nhiều theo mùa.",
    warning: "Cẩn thận cột sống do thân dài chân ngắn",
    energyLevel: 4,
    apartmentFriendly: 4,
    kidFriendly: 5,
    petFriendly: 4,
    sheddingLevel: 4,
    groomingNeeds: 3,
    trainability: 4,
    barkingLevel: 3,
    position: 1,
  },
  {
    name: "Golden Retriever",
    slug: "golden-retriever",
    description:
      "Giống chó gia đình số 1 thế giới. Hiền lành, thông minh, trung thành tuyệt đối và cực kỳ kiên nhẫn với trẻ em.",
    species: Species.DOG,
    size: BreedSize.LARGE,
    weightRange: "25-34kg",
    priceMin: 15000000,
    priceMax: 25000000,
    image: "/breeds/golden-retriever-1.jpg",
    images: ["/breeds/golden-retriever-1.jpg", "/breeds/golden-retriever-2.jpg", "/breeds/golden-retriever-3.jpg", "/breeds/golden-retriever-4.jpg"],
    tags: ["Hiền lành", "trung thành"],
    careGuide: [
      "Cần vận động mạnh ít nhất 60 phút/ngày, rất thích bơi lội và tha đồ.",
      "Kiểm tra tai định kỳ vì tai cụp dễ giữ ẩm gây viêm.",
      "Kiểm soát khẩu phần ăn tốt để tránh béo phì, giảm áp lực lên khớp.",
    ],
    suitability:
      "Phù hợp gia đình có sân vườn hoặc không gian rộng, có thời gian vận động cùng bé mỗi ngày; rất hợp nhà có trẻ nhỏ.",
    careNotes:
      "Cần vận động mạnh ít nhất 60 phút/ngày và thích bơi lội; kiểm soát khẩu phần ăn để tránh béo phì gây áp lực lên khớp.",
    energyLevel: 5,
    apartmentFriendly: 2,
    kidFriendly: 5,
    petFriendly: 5,
    sheddingLevel: 4,
    groomingNeeds: 3,
    trainability: 5,
    barkingLevel: 2,
    position: 2,
  },
  {
    name: "Shih Tzu",
    slug: "shih-tzu",
    alias: "Chó ông già",
    description:
      "Vẻ ngoài quý tộc với bộ lông dài buông phủ như áo choàng. Tình cảm, quấn chủ, thích được vuốt ve và nằm cạnh người.",
    species: Species.DOG,
    size: BreedSize.SMALL,
    weightRange: "4-7kg",
    priceMin: 8000000,
    priceMax: 20000000,
    image: "/breeds/shih-tzu-1.jpg",
    images: ["/breeds/shih-tzu-1.jpg", "/breeds/shih-tzu-2.jpg", "/breeds/shih-tzu-3.jpg", "/breeds/shih-tzu-4.jpg"],
    tags: ["Siêu thân thiện", "quấn chủ"],
    careGuide: [
      "Chải lông hàng ngày để tránh rối, tỉa gọn vùng mắt tránh kích ứng.",
      "Nhạy cảm với nhiệt độ cao do mũi ngắn, hạn chế vận động mạnh giữa trưa.",
      "Vệ sinh vùng mắt-mũi thường xuyên vì dễ chảy nước mắt, đóng ghèn.",
    ],
    suitability:
      "Phù hợp người lớn tuổi hoặc gia đình ít vận động, thích một người bạn nhỏ quấn quýt trong nhà.",
    careNotes:
      "Chải lông hàng ngày để tránh rối, tỉa gọn vùng mắt và vệ sinh mắt-mũi thường xuyên; hạn chế vận động mạnh giữa trưa nắng.",
    energyLevel: 2,
    apartmentFriendly: 5,
    kidFriendly: 4,
    petFriendly: 4,
    sheddingLevel: 2,
    groomingNeeds: 5,
    trainability: 3,
    barkingLevel: 3,
    position: 3,
  },
  {
    name: "Alaskan Malamute",
    slug: "alaskan-malamute",
    description:
      "Thân hình vạm vỡ, bộ lông kép dày uy nghi mang nét hoang dã. Ẩn bên trong là tính cách cực kỳ ngọt ngào và thích làm nũng.",
    species: Species.DOG,
    size: BreedSize.XLARGE,
    weightRange: "34-43kg",
    priceMin: 15000000,
    priceMax: 35000000,
    image: "/breeds/alaskan-malamute-2.jpg",
    images: ["/breeds/alaskan-malamute-2.jpg", "/breeds/alaskan-malamute-1.jpg", "/breeds/alaskan-malamute-3.jpg", "/breeds/alaskan-malamute-4.jpg"],
    tags: ["Hiền lành", "thân thiện"],
    careGuide: [
      "Bộ lông kép dày cần chải 3-4 lần/tuần, đặc biệt vào mùa thay lông.",
      "Cần không gian rộng và vận động nhiều, không phù hợp căn hộ nhỏ.",
      "Chịu lạnh tốt nhưng dễ sốc nhiệt mùa hè, cần nơi mát và đủ nước uống.",
    ],
    suitability:
      "Phù hợp nhà có sân vườn rộng và chủ có kinh nghiệm nuôi chó lớn, cần nhiều không gian vận động.",
    careNotes:
      "Bộ lông kép dày cần chải 3-4 lần/tuần, đặc biệt mùa thay lông; cần nơi mát và đủ nước vào mùa hè vì dễ sốc nhiệt.",
    warning: "Dễ sốc nhiệt mùa hè — cần phòng mát và đủ nước",
    energyLevel: 5,
    apartmentFriendly: 1,
    kidFriendly: 4,
    petFriendly: 3,
    sheddingLevel: 5,
    groomingNeeds: 4,
    trainability: 3,
    barkingLevel: 2,
    position: 4,
  },
  {
    name: "Beagle",
    slug: "beagle",
    alias: "Chó săn thỏ",
    description:
      "Đôi tai to mềm rủ xuống, ánh mắt cún con đáng yêu. Luôn tràn đầy năng lượng, mang lại tiếng cười cho cả nhà.",
    species: Species.DOG,
    size: BreedSize.MEDIUM,
    weightRange: "9-11kg",
    priceMin: 10000000,
    priceMax: 20000000,
    image: "/breeds/beagle-1.jpg",
    images: ["/breeds/beagle-1.jpg", "/breeds/beagle-2.jpg", "/breeds/beagle-3.jpg", "/breeds/beagle-4.jpg"],
    tags: ["Lạc quan", "hiền lành"],
    careGuide: [
      "Khứu giác nhạy nên dễ bị phân tâm khi dắt đi dạo, cần dây xích chắc chắn.",
      "Ăn khá nhiều và dễ béo phì, nên kiểm soát khẩu phần chặt chẽ.",
      "Tai dài rủ cần vệ sinh định kỳ để tránh ẩm và viêm tai.",
    ],
    suitability:
      "Phù hợp gia đình năng động, có trẻ nhỏ và không gian cho bé chạy nhảy; cần chủ kiên nhẫn vì bé khá nghịch.",
    careNotes:
      "Khứu giác nhạy nên dễ bị phân tâm khi dạo, cần dây xích chắc chắn; kiểm soát khẩu phần ăn vì dễ béo phì.",
    energyLevel: 5,
    apartmentFriendly: 3,
    kidFriendly: 5,
    petFriendly: 4,
    sheddingLevel: 3,
    groomingNeeds: 2,
    trainability: 3,
    barkingLevel: 5,
    position: 5,
  },
  {
    name: "British Shorthair",
    slug: "british-shorthair",
    alias: "Mèo Anh lông ngắn",
    description:
      "Gương mặt tròn phúc hậu, thân hình mập mạp và bộ lông ngắn dày như nhung. Điềm đạm, ít kêu, rất hợp gia đình có trẻ nhỏ.",
    species: Species.CAT,
    size: BreedSize.MEDIUM,
    weightRange: "4-7kg",
    priceMin: 8000000,
    priceMax: 20000000,
    image: "/breeds/british-shorthair-1.jpg",
    images: ["/breeds/british-shorthair-1.jpg", "/breeds/british-shorthair-2.jpg", "/breeds/british-shorthair-3.jpg", "/breeds/british-shorthair-4.jpg"],
    tags: ["Điềm đạm", "thân thiện"],
    careGuide: [
      "Bộ lông ngắn dày chỉ cần chải 1-2 lần/tuần.",
      "Dễ tăng cân do ít vận động, nên có đồ chơi vận động trong nhà.",
      "Kiểm tra cân nặng định kỳ, đặc biệt sau khi triệt sản.",
    ],
    suitability:
      "Phù hợp gia đình có trẻ nhỏ, người mới nuôi mèo lần đầu vì tính cách điềm đạm, ít kêu.",
    careNotes:
      "Bộ lông ngắn dày chỉ cần chải 1-2 lần/tuần; nên có đồ chơi vận động trong nhà vì bé khá lười và dễ tăng cân.",
    energyLevel: 2,
    apartmentFriendly: 5,
    kidFriendly: 5,
    petFriendly: 4,
    sheddingLevel: 3,
    groomingNeeds: 2,
    trainability: 3,
    barkingLevel: 1,
    position: 6,
  },
  {
    name: "Persian",
    slug: "persian",
    alias: "Mèo Ba Tư",
    description:
      "Mặt tịt đặc trưng, bộ lông dài mượt sang trọng. Tính cách nhẹ nhàng, thích không gian yên tĩnh và được chăm chút mỗi ngày.",
    species: Species.CAT,
    size: BreedSize.MEDIUM,
    weightRange: "3-5kg",
    priceMin: 10000000,
    priceMax: 30000000,
    image: "/breeds/persian-1.jpg",
    images: ["/breeds/persian-1.jpg", "/breeds/persian-2.jpg", "/breeds/persian-3.jpg"],
    tags: ["Sang chảnh", "nhẹ nhàng"],
    careGuide: [
      "Cần chải lông mỗi ngày để tránh rối và bết lông.",
      "Vệ sinh vùng mặt thường xuyên vì mũi tịt dễ đóng ghèn, chảy nước mắt.",
      "Nên tắm định kỳ 3-4 tuần/lần để giữ lông sạch, giảm rụng.",
    ],
    suitability:
      "Phù hợp người thích không gian yên tĩnh và có thời gian chăm chút lông cho bé mỗi ngày; hợp căn hộ.",
    careNotes:
      "Cần chải lông mỗi ngày để tránh rối và bết lông; vệ sinh vùng mặt thường xuyên vì mũi tịt dễ đóng ghèn, chảy nước mắt.",
    warning: "Mũi tịt dễ khó thở khi nóng — tránh vận động mạnh giữa trưa",
    energyLevel: 1,
    apartmentFriendly: 5,
    kidFriendly: 3,
    petFriendly: 3,
    sheddingLevel: 4,
    groomingNeeds: 5,
    trainability: 2,
    barkingLevel: 1,
    position: 7,
  },
  {
    name: "Scottish Fold",
    slug: "scottish-fold",
    alias: "Mèo tai cụp",
    description:
      "Đôi tai cụp gập về phía trước tạo gương mặt tròn như cú mèo. Hiền lành, thích ôm ấp và cực kỳ dễ gần.",
    species: Species.CAT,
    size: BreedSize.MEDIUM,
    weightRange: "3-6kg",
    priceMin: 9000000,
    priceMax: 25000000,
    image: "/breeds/scottish-fold-1.jpg",
    images: ["/breeds/scottish-fold-1.jpg", "/breeds/scottish-fold-2.jpg", "/breeds/scottish-fold-3.jpg", "/breeds/scottish-fold-4.jpg"],
    tags: ["Hiền lành", "thích ôm ấp"],
    careGuide: [
      "Theo dõi khớp và tai định kỳ vì đặc điểm di truyền tai cụp có thể ảnh hưởng sụn.",
      "Chải lông 2 lần/tuần, vệ sinh tai nhẹ nhàng tránh gây đau.",
      "Ưa thích không gian yên tĩnh, hạn chế thay đổi môi trường đột ngột.",
    ],
    suitability:
      "Phù hợp gia đình thích ôm ấp, không gian sống ổn định vì bé khá nhạy cảm với thay đổi môi trường.",
    careNotes:
      "Theo dõi khớp và tai định kỳ vì đặc điểm di truyền tai cụp có thể ảnh hưởng sụn; chải lông 2 lần/tuần.",
    warning: "Gen tai cụp có thể ảnh hưởng sụn khớp — cần khám định kỳ",
    energyLevel: 2,
    apartmentFriendly: 5,
    kidFriendly: 4,
    petFriendly: 4,
    sheddingLevel: 3,
    groomingNeeds: 3,
    trainability: 3,
    barkingLevel: 1,
    position: 8,
  },
  {
    name: "Munchkin",
    slug: "munchkin",
    alias: "Mèo chân ngắn",
    description:
      "Giống mèo chân ngắn độc đáo, hiếm gặp tại Việt Nam. Năng động, tò mò, thích khám phá mọi ngóc ngách trong nhà.",
    species: Species.CAT,
    size: BreedSize.SMALL,
    weightRange: "2-4kg",
    priceMin: 15000000,
    priceMax: 40000000,
    image: "/breeds/munchkin-1.jpg",
    images: ["/breeds/munchkin-1.jpg", "/breeds/munchkin-2.jpg", "/breeds/munchkin-3.jpg", "/breeds/munchkin-4.jpg"],
    tags: ["Năng động", "tò mò"],
    careGuide: [
      "Do chân ngắn, hạn chế để bé nhảy từ độ cao lớn.",
      "Vận động vừa phải với đồ chơi mặt đất, tránh leo trèo quá nhiều.",
      "Theo dõi cột sống và khớp định kỳ khi khám sức khỏe.",
    ],
    suitability:
      "Phù hợp người thích khám phá cùng bé, cần không gian an toàn hạn chế bé nhảy từ độ cao lớn.",
    careNotes:
      "Do chân ngắn, hạn chế để bé nhảy từ độ cao lớn; ưu tiên đồ chơi vận động ở mặt đất.",
    warning: "Cẩn thận cột sống do chân ngắn",
    energyLevel: 4,
    apartmentFriendly: 4,
    kidFriendly: 4,
    petFriendly: 3,
    sheddingLevel: 3,
    groomingNeeds: 3,
    trainability: 3,
    barkingLevel: 2,
    position: 9,
  },
  {
    name: "Maine Coon",
    slug: "maine-coon",
    description:
      "Mèo khổng lồ hiền lành với bộ lông bờm sư tử và chiếc đuôi xù dài. Thông minh, trung thành, tính cách gần giống chó.",
    species: Species.CAT,
    size: BreedSize.LARGE,
    weightRange: "6-11kg",
    priceMin: 20000000,
    priceMax: 60000000,
    image: "/breeds/maine-coon-1.jpg",
    images: ["/breeds/maine-coon-1.jpg", "/breeds/maine-coon-2.jpg", "/breeds/maine-coon-3.jpg", "/breeds/maine-coon-4.jpg"],
    tags: ["To lớn", "hiền lành"],
    careGuide: [
      "Bộ lông dài cần chải 2-3 lần/tuần để tránh rối.",
      "Ăn nhiều hơn giống mèo thường do thân hình lớn, cần khẩu phần phù hợp.",
      "Kiểm tra tim định kỳ vì giống này có nguy cơ bệnh cơ tim di truyền.",
    ],
    suitability:
      "Phù hợp gia đình có không gian rộng rãi, thích một người bạn to lớn nhưng tính cách gần giống chó, hòa đồng.",
    careNotes:
      "Bộ lông dài cần chải 2-3 lần/tuần; nên khám tim định kỳ vì giống này có nguy cơ bệnh cơ tim di truyền.",
    warning: "Nguy cơ bệnh cơ tim di truyền — nên khám tim định kỳ",
    energyLevel: 3,
    apartmentFriendly: 3,
    kidFriendly: 5,
    petFriendly: 5,
    sheddingLevel: 4,
    groomingNeeds: 4,
    trainability: 4,
    barkingLevel: 2,
    position: 10,
  },
  {
    name: "Ragdoll",
    slug: "ragdoll",
    description:
      "Mắt xanh biển, lông dài mềm mại. Được gọi là 'búp bê vải' vì thả lỏng hoàn toàn khi được bế lên — cực kỳ ngoan và bám người.",
    species: Species.CAT,
    size: BreedSize.LARGE,
    weightRange: "4-9kg",
    priceMin: 15000000,
    priceMax: 45000000,
    image: "/breeds/ragdoll-1.jpg",
    images: ["/breeds/ragdoll-1.jpg", "/breeds/ragdoll-2.jpg", "/breeds/ragdoll-3.jpg"],
    tags: ["Ngoan ngoãn", "bám người"],
    careGuide: [
      "Tính cách thả lỏng khi bế nên dễ bị tổn thương nếu xử lý thô bạo.",
      "Chải lông 2-3 lần/tuần dù lông không quá rối như Ba Tư.",
      "Ưa thích ở trong nhà, không nên để bé ra ngoài một mình.",
    ],
    suitability:
      "Phù hợp gia đình có trẻ nhỏ, thích một bé mèo ngoan ngoãn, bám người và thả lỏng khi được bế.",
    careNotes:
      "Xử lý nhẹ nhàng vì bé khá thả lỏng khi bế; chải lông 2-3 lần/tuần dù không quá rối như Ba Tư.",
    energyLevel: 2,
    apartmentFriendly: 5,
    kidFriendly: 5,
    petFriendly: 4,
    sheddingLevel: 3,
    groomingNeeds: 3,
    trainability: 3,
    barkingLevel: 1,
    position: 11,
  },
];

/**
 * Toàn bộ catalogue giống. Tách làm hai file để `breeds.ts` không phình quá dài:
 * 12 giống nền tảng ở đây, phần mở rộng ở `breeds-extra.ts`.
 */
export const BREEDS: BreedSeed[] = [...CORE_BREEDS, ...EXTRA_BREEDS];
