/**
 * Bản tiếng Anh cho nội dung shop tự nhập trong database.
 *
 * `messages.ts` lo phần chữ cố định của giao diện. File này lo phần chữ nằm
 * trong database (tên sản phẩm, mô tả, tag tính cách, ghi chú chăm sóc...) —
 * những thứ chỉ có một bản tiếng Việt duy nhất nên không thể dịch bằng key.
 *
 * CÁCH DÙNG: khoá là chính chuỗi tiếng Việt, viết thường và bỏ khoảng trắng
 * thừa. Chữ hoa/thường ở đầu sẽ được tự chỉnh theo bản gốc, nên tag "Hiền lành"
 * và "hiền lành" chỉ cần một dòng duy nhất ở đây.
 *
 * THÊM SẢN PHẨM MỚI: nhập tiếng Việt ở trang quản trị như bình thường, rồi
 * thêm một dòng vào đây. Chuỗi nào chưa có trong từ điển sẽ giữ nguyên tiếng
 * Việt thay vì hiện chuỗi rỗng — thà chưa dịch còn hơn mất chữ.
 */
export const CONTENT_EN: Record<string, string> = {
  // ─── Tag tính cách (dùng chung cho cả thú cưng và giống) ───────────────
  "vui vẻ": "cheerful",
  "rất quấn chủ": "very attached to its owner",
  "quấn chủ": "attached to its owner",
  "thông minh": "clever",
  "dễ huấn luyện": "easy to train",
  "năng động": "lively",
  "thích khám phá": "loves exploring",
  "hiền lành": "gentle",
  "thích ôm ấp": "loves cuddles",
  "sang chảnh": "elegant",
  "thích được vuốt ve": "loves being petted",
  "điềm đạm": "calm",
  "thân thiện với trẻ nhỏ": "good with young children",
  "thân thiện": "friendly",
  "siêu thân thiện": "super friendly",
  "trung thành": "loyal",
  "lạc quan": "upbeat",
  "nhẹ nhàng": "easy-going",
  "tò mò": "curious",
  "to lớn": "large",
  "ngoan ngoãn": "well behaved",
  "bám người": "sticks close to its people",

  // ─── Màu lông ─────────────────────────────────────────────────────────
  "trắng": "White",
  "nâu đỏ": "Red brown",
  "vàng nâu": "Golden brown",
  "xám vện": "Grey tabby",
  "xanh khói": "Smoke blue",
  "vện trắng nâu": "White and brown tabby",

  // ─── Phụ kiện & dịch vụ ───────────────────────────────────────────────
  "gói spa tắm rửa & cắt tỉa lông cơ bản": "Basic Spa Package — Bath & Grooming",
  "dịch vụ tắm gội, sấy lông, cắt tỉa móng và vệ sinh tai cơ bản cho mèo/chó, sử dụng sản phẩm chuyên dụng dịu nhẹ.":
    "A basic bath, blow-dry, nail trim and ear cleaning for cats and dogs, using gentle professional products.",

  "vòng cổ da kèm lục lạc - size s/m": "Leather Collar with Bell - Size S/M",
  "vòng cổ da mềm điều chỉnh được nhiều nấc, kèm lục lạc nhỏ giúp bạn dễ biết bé đang ở đâu trong nhà.":
    "A soft leather collar with several adjustment notches and a small bell, so you always know where your pet is in the house.",

  "bát ăn đôi inox có đế chống trượt": "Double Stainless Steel Bowl with Non-Slip Base",
  "bát đôi inox không gỉ đựng thức ăn và nước riêng, đế cao su chống trượt và chống đổ khi bé ăn.":
    "A stainless steel double bowl that keeps food and water apart, with a rubber base that stops it slipping or tipping while your pet eats.",

  "sữa tắm dưỡng lông cho chó & mèo - chai 500ml":
    "Coat-Conditioning Shampoo for Dogs & Cats - 500ml Bottle",
  "sữa tắm dịu nhẹ ph cân bằng, khử mùi và dưỡng lông mượt, dùng được cho cả chó và mèo từ 3 tháng tuổi.":
    "A gentle pH-balanced shampoo that deodorises and leaves the coat soft and glossy; suitable for both dogs and cats from three months old.",

  "cát vệ sinh mèo bentonite khử mùi - bao 10kg": "Deodorising Bentonite Cat Litter - 10kg Bag",
  "cát vệ sinh vón cục nhanh, khử mùi hiệu quả, an toàn cho thú cưng, dễ dàng dọn dẹp hằng ngày.":
    "Fast-clumping litter with effective odour control, safe for pets and easy to scoop every day.",

  "nệm ngủ lông cừu cho thú cưng - size m": "Fleece Pet Sleeping Mat - Size M",
  "nệm lông cừu mềm ấm, đáy chống trượt, tháo giặt máy được — chỗ ngủ êm ái cho bé quanh năm.":
    "A soft, warm fleece mat with a non-slip base that comes apart for machine washing — a cosy bed all year round.",

  "chuồng sắt sơn tĩnh điện cho chó - size l": "Powder-Coated Steel Dog Crate - Size L",
  "chuồng sắt sơn tĩnh điện chống gỉ, có khay hứng tháo rời dễ vệ sinh, phù hợp chó cỡ trung và lớn.":
    "A rust-resistant powder-coated steel crate with a removable tray for easy cleaning, suited to medium and large dogs.",

  "lồng vận chuyển thú cưng size m": "Pet Carrier - Size M",
  "lồng vận chuyển chắc chắn, thông thoáng, phù hợp cho mèo/chó nhỏ khi di chuyển hoặc đi khám thú y.":
    "A sturdy, well-ventilated carrier for small cats and dogs on trips or visits to the vet.",

  "trụ cào móng cho mèo bọc dây thừng": "Rope-Wrapped Cat Scratching Post",
  "trụ cào bọc dây thừng sisal bền chắc, giúp bé mài móng đúng chỗ và không cào vào sofa, thảm trong nhà.":
    "A post wrapped in hard-wearing sisal rope, so your cat files its claws in the right place instead of on the sofa or the rugs.",

  "bóng cao su gặm cho chó - size m": "Rubber Chew Ball for Dogs - Size M",
  "bóng cao su tự nhiên đàn hồi tốt, an toàn khi gặm, hỗ trợ làm sạch răng và giải toả năng lượng cho bé.":
    "A springy natural rubber ball that is safe to chew, helps clean the teeth and burns off your dog's energy.",

  "cần câu lông vũ cho mèo": "Feather Wand Cat Teaser",
  "cần câu lông vũ kích thích bản năng săn mồi, giúp bé vận động mỗi ngày và gắn kết với chủ khi chơi cùng.":
    "A feather wand that triggers your cat's hunting instinct, gets it moving every day and builds a bond with you at play.",

  "pate cho mèo vị cá ngừ - lốc 12 hộp": "Tuna Pâté for Cats - Pack of 12 Tins",
  "pate mềm thơm vị cá ngừ, bổ sung độ ẩm cho bé lười uống nước, dùng làm bữa chính hoặc topping trộn hạt.":
    "A soft, fragrant tuna pâté that adds moisture for cats that rarely drink; serve as a main meal or as a topping over kibble.",

  "hạt cho chó trưởng thành vị gà & rau củ - bao 3kg":
    "Adult Dog Kibble with Chicken & Vegetables - 3kg Bag",
  "hạt khô giàu đạm từ thịt gà, bổ sung rau củ và chất xơ giúp bé tiêu hoá tốt, phù hợp chó trưởng thành mọi giống.":
    "Dry kibble rich in chicken protein, with vegetables and fibre for healthy digestion; suitable for adult dogs of any breed.",

  "hạt royal canin cho mèo trưởng thành - bao 2kg": "Royal Canin Adult Cat Kibble - 2kg Bag",
  "thức ăn hạt cao cấp royal canin dành cho mèo trưởng thành, bổ sung đầy đủ dưỡng chất, hỗ trợ tiêu hoá và lông mượt.":
    "Premium Royal Canin dry food for adult cats, fully balanced to support digestion and a glossy coat.",

  // ─── Các bé đang bán ──────────────────────────────────────────────────
  "chó corgi - chân ngắn đuôi cụt": "Corgi Puppy - Short Legs, Bobtail",
  "corgi vui vẻ, năng động, rất quấn chủ. nguồn gốc rõ ràng, có sổ tiêm phòng đầy đủ.":
    "A cheerful, energetic Corgi that bonds closely with its owner. Clear pedigree with a complete vaccination record.",
  "phù hợp gia đình năng động, có sân hoặc công viên gần nhà để bé chạy nhảy.":
    "Best for active families with a yard or a park nearby where the puppy can run.",

  "chó poodle tiny - màu nâu đỏ": "Tiny Poodle Puppy - Red Brown",
  "poodle tiny lông xoăn, thông minh, dễ huấn luyện. thích hợp nuôi trong căn hộ, đã tiêm phòng 2 mũi.":
    "A curly-coated Tiny Poodle, clever and easy to train. Well suited to apartment living; already had two vaccinations.",
  "phù hợp căn hộ, người mới nuôi chó lần đầu, cần chó ít rụng lông.":
    "Best for apartments and first-time dog owners who need a low-shedding dog.",

  "mèo munchkin chân ngắn": "Short-Legged Munchkin Kitten",
  "giống mèo chân ngắn độc đáo, hiếm gặp tại việt nam. năng động, thích khám phá, phù hợp gia đình có không gian rộng.":
    "A distinctive short-legged breed, still rare in Vietnam. Lively and inquisitive, and best suited to a family with plenty of space.",
  "phù hợp gia đình có không gian rộng, thích mèo năng động khám phá.":
    "Best for families with plenty of space who want a lively, inquisitive cat.",

  "mèo scottish fold - tai cụp đáng yêu": "Scottish Fold Kitten - Adorable Folded Ears",
  "mèo tai cụp scottish fold, tính cách hiền lành, thích ôm ấp. đã được tẩy giun và tiêm phòng mũi đầu.":
    "A folded-ear Scottish Fold with a gentle nature that loves being cuddled. Already dewormed and given its first vaccination.",
  "phù hợp người sống một mình, thích mèo ít vận động, hay ôm ấp.":
    "Best for people living alone who want a calm, cuddly cat.",

  "mèo ba tư (persian) - lông trắng mắt xanh": "Persian Kitten - White Coat, Blue Eyes",
  "mèo ba tư mặt tịt, lông dài mượt, ngoại hình sang trọng. được chăm sóc theo chế độ dinh dưỡng chuẩn, sức khỏe ổn định.":
    "A flat-faced Persian with a long, silky coat and an elegant look. Raised on a proper diet and in stable health.",
  "phù hợp người thích chải chuốt, có thời gian chăm sóc lông mỗi ngày.":
    "Best for owners who enjoy grooming and have time for the coat every day.",

  "mèo anh lông ngắn (british shorthair) - màu xanh khói":
    "British Shorthair Kitten - Smoke Blue",
  "mèo anh lông ngắn thuần chủng, tính cách điềm đạm, thân thiện với trẻ nhỏ. đã tiêm phòng đầy đủ và có giấy khám sức khỏe.":
    "A purebred British Shorthair with a calm nature that is good with young children. Fully vaccinated, with a health certificate.",
  "phù hợp gia đình có trẻ nhỏ, người mới nuôi mèo lần đầu.":
    "Best for families with young children and first-time cat owners.",

  // ─── Giống chó ────────────────────────────────────────────────────────
  // Poodle
  "bộ lông xoăn mềm không rụng, thông minh xuất chúng và học hỏi cực nhanh. vóc dáng nhỏ gọn hợp căn hộ, luôn quấn quýt bên chủ.":
    "A soft, curly coat that barely sheds, outstanding intelligence and a very quick learner. Compact enough for an apartment, and always by your side.",
  "phù hợp gia đình sống trong căn hộ, người mới nuôi chó lần đầu vì poodle rất dễ dạy và gần như không rụng lông.":
    "Best for apartment families and first-time dog owners, because Poodles are very easy to teach and shed almost nothing.",
  "cần chải lông 2-3 lần/tuần và cắt tỉa định kỳ mỗi 4-6 tuần để tránh lông rối; nên có 20-30 phút vận động trí tuệ mỗi ngày.":
    "Brush 2-3 times a week and trim every 4-6 weeks to keep the coat from matting; allow 20-30 minutes of mental exercise a day.",
  "chải lông 2-3 lần/tuần để tránh rối, cắt tỉa mỗi 4-6 tuần.":
    "Brush 2-3 times a week to prevent matting, and trim every 4-6 weeks.",
  "cần vận động nhẹ 20-30 phút mỗi ngày, thích hợp trò chơi trí tuệ.":
    "Needs 20-30 minutes of light exercise a day, and enjoys puzzle games.",
  "kiểm tra tai thường xuyên vì lông trong tai dễ gây ẩm, viêm.":
    "Check the ears often — hair inside the ear traps moisture and causes infections.",

  // Corgi
  "chân ngắn, mông tròn và nụ cười thường trực. corgi năng động, rất quấn chủ và hoà đồng với trẻ nhỏ.":
    "Short legs, a round bottom and a permanent smile. Corgis are energetic, very attached to their owner and get on well with young children.",
  "phù hợp gia đình có trẻ nhỏ và người có thời gian dắt bé vận động mỗi ngày; sống tốt trong căn hộ nếu được ra ngoài thường xuyên.":
    "Best for families with young children and owners with time to walk their dog every day; lives well in an apartment as long as it gets out often.",
  "hạn chế cho bé leo cầu thang hoặc nhảy từ trên cao để bảo vệ cột sống; chải lông 2-3 lần/tuần vì rụng lông khá nhiều theo mùa.":
    "Limit stair climbing and jumping down from heights to protect the spine; brush 2-3 times a week, as seasonal shedding is heavy.",
  "vận động đều đặn 30-45 phút/ngày để tránh tăng cân do thân dài chân ngắn.":
    "Exercise 30-45 minutes a day to prevent the weight gain that a long body on short legs cannot carry well.",
  "hạn chế cho leo cầu thang hoặc nhảy cao để bảo vệ cột sống.":
    "Limit stair climbing and jumping from heights to protect the spine.",
  "rụng lông theo mùa khá nhiều, nên chải lông 2-3 lần/tuần.":
    "Sheds heavily with the seasons, so brush 2-3 times a week.",
  "cẩn thận cột sống do thân dài chân ngắn": "Watch the spine — a long body on short legs",

  // Golden Retriever
  "giống chó gia đình số 1 thế giới. hiền lành, thông minh, trung thành tuyệt đối và cực kỳ kiên nhẫn với trẻ em.":
    "The world's number one family dog. Gentle, clever, utterly loyal and extremely patient with children.",
  "phù hợp gia đình có sân vườn hoặc không gian rộng, có thời gian vận động cùng bé mỗi ngày; rất hợp nhà có trẻ nhỏ.":
    "Best for families with a garden or plenty of space and time to exercise together every day; excellent in a house with young children.",
  "cần vận động mạnh ít nhất 60 phút/ngày và thích bơi lội; kiểm soát khẩu phần ăn để tránh béo phì gây áp lực lên khớp.":
    "Needs at least 60 minutes of hard exercise a day and loves to swim; control portions to keep obesity from straining the joints.",
  "cần vận động mạnh ít nhất 60 phút/ngày, rất thích bơi lội và tha đồ.":
    "Needs at least 60 minutes of hard exercise a day, and loves swimming and fetching.",
  "kiểm tra tai định kỳ vì tai cụp dễ giữ ẩm gây viêm.":
    "Check the ears regularly — drop ears trap moisture and get infected.",
  "kiểm soát khẩu phần ăn tốt để tránh béo phì, giảm áp lực lên khớp.":
    "Keep portions under control to avoid obesity and reduce strain on the joints.",

  // Shih Tzu
  "chó ông già": "The little old man dog",
  "vẻ ngoài quý tộc với bộ lông dài buông phủ như áo choàng. tình cảm, quấn chủ, thích được vuốt ve và nằm cạnh người.":
    "An aristocratic look, with a long coat that drapes like a cloak. Affectionate and devoted, happiest being petted and lying beside you.",
  "phù hợp người lớn tuổi hoặc gia đình ít vận động, thích một người bạn nhỏ quấn quýt trong nhà.":
    "Best for older owners or quieter households who want a small companion that stays close indoors.",
  "chải lông hàng ngày để tránh rối, tỉa gọn vùng mắt và vệ sinh mắt-mũi thường xuyên; hạn chế vận động mạnh giữa trưa nắng.":
    "Brush daily to prevent matting, trim around the eyes and clean the eyes and nose often; avoid hard exercise in the midday heat.",
  "chải lông hàng ngày để tránh rối, tỉa gọn vùng mắt tránh kích ứng.":
    "Brush daily to prevent matting, and trim around the eyes to avoid irritation.",
  "nhạy cảm với nhiệt độ cao do mũi ngắn, hạn chế vận động mạnh giữa trưa.":
    "Sensitive to heat because of the short muzzle; avoid hard exercise at midday.",
  "vệ sinh vùng mắt-mũi thường xuyên vì dễ chảy nước mắt, đóng ghèn.":
    "Clean around the eyes and nose often — this breed tears and crusts easily.",

  // Alaskan Malamute
  "thân hình vạm vỡ, bộ lông kép dày uy nghi mang nét hoang dã. ẩn bên trong là tính cách cực kỳ ngọt ngào và thích làm nũng.":
    "A powerful frame under a thick, majestic double coat with a hint of the wild. Underneath it is an extremely sweet dog that loves attention.",
  "phù hợp nhà có sân vườn rộng và chủ có kinh nghiệm nuôi chó lớn, cần nhiều không gian vận động.":
    "Best for homes with a large garden and owners experienced with big dogs, with plenty of room to exercise.",
  "bộ lông kép dày cần chải 3-4 lần/tuần, đặc biệt mùa thay lông; cần nơi mát và đủ nước vào mùa hè vì dễ sốc nhiệt.":
    "The thick double coat needs brushing 3-4 times a week, especially when moulting; keep a cool spot and plenty of water in summer, as this breed overheats easily.",
  "bộ lông kép dày cần chải 3-4 lần/tuần, đặc biệt vào mùa thay lông.":
    "The thick double coat needs brushing 3-4 times a week, especially during moulting season.",
  "cần không gian rộng và vận động nhiều, không phù hợp căn hộ nhỏ.":
    "Needs space and a lot of exercise; not suited to a small apartment.",
  "chịu lạnh tốt nhưng dễ sốc nhiệt mùa hè, cần nơi mát và đủ nước uống.":
    "Handles the cold well but overheats easily in summer — keep it cool with plenty of water.",
  "dễ sốc nhiệt mùa hè — cần phòng mát và đủ nước":
    "Prone to heatstroke in summer — needs a cool room and plenty of water",

  // Beagle
  "chó săn thỏ": "The rabbit hound",
  "đôi tai to mềm rủ xuống, ánh mắt cún con đáng yêu. luôn tràn đầy năng lượng, mang lại tiếng cười cho cả nhà.":
    "Big, soft, drooping ears and permanent puppy eyes. Always full of energy, and always good for a laugh at home.",
  "phù hợp gia đình năng động, có trẻ nhỏ và không gian cho bé chạy nhảy; cần chủ kiên nhẫn vì bé khá nghịch.":
    "Best for active families with young children and room to run; needs a patient owner, as this dog is quite mischievous.",
  "khứu giác nhạy nên dễ bị phân tâm khi dạo, cần dây xích chắc chắn; kiểm soát khẩu phần ăn vì dễ béo phì.":
    "A keen nose is easily distracted on walks, so use a strong lead; control portions, as this breed puts on weight easily.",
  "khứu giác nhạy nên dễ bị phân tâm khi dắt đi dạo, cần dây xích chắc chắn.":
    "A keen nose is easily distracted on walks, so use a strong lead.",
  "ăn khá nhiều và dễ béo phì, nên kiểm soát khẩu phần chặt chẽ.":
    "Eats a lot and puts on weight easily, so keep portions tightly controlled.",
  "tai dài rủ cần vệ sinh định kỳ để tránh ẩm và viêm tai.":
    "Long drop ears need cleaning regularly to avoid moisture and ear infections.",

  // ─── Giống mèo ────────────────────────────────────────────────────────
  // British Shorthair
  "mèo anh lông ngắn": "British Shorthair cat",
  "gương mặt tròn phúc hậu, thân hình mập mạp và bộ lông ngắn dày như nhung. điềm đạm, ít kêu, rất hợp gia đình có trẻ nhỏ.":
    "A round, kindly face, a sturdy body and a short coat as dense as velvet. Calm, quiet, and a great fit for families with young children.",
  "phù hợp gia đình có trẻ nhỏ, người mới nuôi mèo lần đầu vì tính cách điềm đạm, ít kêu.":
    "Best for families with young children and first-time cat owners, thanks to a calm nature and very little meowing.",
  "bộ lông ngắn dày chỉ cần chải 1-2 lần/tuần; nên có đồ chơi vận động trong nhà vì bé khá lười và dễ tăng cân.":
    "The short, dense coat only needs brushing 1-2 times a week; keep active toys indoors, as this cat is rather lazy and gains weight easily.",
  "bộ lông ngắn dày chỉ cần chải 1-2 lần/tuần.":
    "The short, dense coat only needs brushing 1-2 times a week.",
  "dễ tăng cân do ít vận động, nên có đồ chơi vận động trong nhà.":
    "Gains weight easily from being inactive, so keep active toys indoors.",
  "kiểm tra cân nặng định kỳ, đặc biệt sau khi triệt sản.":
    "Weigh regularly, particularly after neutering.",

  // Persian
  "mèo ba tư": "Persian cat",
  "mặt tịt đặc trưng, bộ lông dài mượt sang trọng. tính cách nhẹ nhàng, thích không gian yên tĩnh và được chăm chút mỗi ngày.":
    "The signature flat face and a long, luxurious silky coat. Easy-going by nature, fond of quiet spaces and daily pampering.",
  "phù hợp người thích không gian yên tĩnh và có thời gian chăm chút lông cho bé mỗi ngày; hợp căn hộ.":
    "Best for owners who like a quiet home and have time to groom the coat every day; well suited to an apartment.",
  "cần chải lông mỗi ngày để tránh rối và bết lông; vệ sinh vùng mặt thường xuyên vì mũi tịt dễ đóng ghèn, chảy nước mắt.":
    "Brush daily to prevent matting and a greasy coat; clean the face often, as the flat nose leads to crusting and watery eyes.",
  "cần chải lông mỗi ngày để tránh rối và bết lông.":
    "Brush daily to prevent matting and a greasy coat.",
  "vệ sinh vùng mặt thường xuyên vì mũi tịt dễ đóng ghèn, chảy nước mắt.":
    "Clean the face often — the flat nose leads to crusting and watery eyes.",
  "nên tắm định kỳ 3-4 tuần/lần để giữ lông sạch, giảm rụng.":
    "Bathe every 3-4 weeks to keep the coat clean and reduce shedding.",
  "mũi tịt dễ khó thở khi nóng — tránh vận động mạnh giữa trưa":
    "The flat nose makes breathing harder in the heat — avoid hard exercise at midday",

  // Scottish Fold
  "mèo tai cụp": "Fold-eared cat",
  "đôi tai cụp gập về phía trước tạo gương mặt tròn như cú mèo. hiền lành, thích ôm ấp và cực kỳ dễ gần.":
    "Ears that fold forward give it a round, owl-like face. Gentle, cuddly and extremely easy to get along with.",
  "phù hợp gia đình thích ôm ấp, không gian sống ổn định vì bé khá nhạy cảm với thay đổi môi trường.":
    "Best for families who love to cuddle and have a settled home, as this cat is fairly sensitive to changes in its environment.",
  "theo dõi khớp và tai định kỳ vì đặc điểm di truyền tai cụp có thể ảnh hưởng sụn; chải lông 2 lần/tuần.":
    "Have the joints and ears checked regularly, as the folded-ear gene can affect cartilage; brush twice a week.",
  "theo dõi khớp và tai định kỳ vì đặc điểm di truyền tai cụp có thể ảnh hưởng sụn.":
    "Have the joints and ears checked regularly, as the folded-ear gene can affect cartilage.",
  "chải lông 2 lần/tuần, vệ sinh tai nhẹ nhàng tránh gây đau.":
    "Brush twice a week, and clean the ears gently so as not to hurt them.",
  "ưa thích không gian yên tĩnh, hạn chế thay đổi môi trường đột ngột.":
    "Prefers quiet spaces; avoid sudden changes to its environment.",
  "gen tai cụp có thể ảnh hưởng sụn khớp — cần khám định kỳ":
    "The folded-ear gene can affect joint cartilage — regular check-ups needed",

  // Munchkin
  "mèo chân ngắn": "Short-legged cat",
  "giống mèo chân ngắn độc đáo, hiếm gặp tại việt nam. năng động, tò mò, thích khám phá mọi ngóc ngách trong nhà.":
    "A distinctive short-legged breed, still rare in Vietnam. Lively and curious, and keen to explore every corner of the house.",
  "phù hợp người thích khám phá cùng bé, cần không gian an toàn hạn chế bé nhảy từ độ cao lớn.":
    "Best for owners who like exploring together, with a safe space that keeps the cat from jumping from a height.",
  "do chân ngắn, hạn chế để bé nhảy từ độ cao lớn; ưu tiên đồ chơi vận động ở mặt đất.":
    "Because of the short legs, do not let it jump from a height; favour toys it can play with on the floor.",
  "do chân ngắn, hạn chế để bé nhảy từ độ cao lớn.":
    "Because of the short legs, do not let it jump from a height.",
  "vận động vừa phải với đồ chơi mặt đất, tránh leo trèo quá nhiều.":
    "Moderate exercise with floor-level toys; avoid too much climbing.",
  "theo dõi cột sống và khớp định kỳ khi khám sức khỏe.":
    "Have the spine and joints checked at each health visit.",
  "cẩn thận cột sống do chân ngắn": "Watch the spine because of the short legs",

  // Maine Coon
  "mèo khổng lồ hiền lành với bộ lông bờm sư tử và chiếc đuôi xù dài. thông minh, trung thành, tính cách gần giống chó.":
    "A gentle giant with a lion's mane of fur and a long, bushy tail. Clever, loyal, and almost dog-like in character.",
  "phù hợp gia đình có không gian rộng rãi, thích một người bạn to lớn nhưng tính cách gần giống chó, hòa đồng.":
    "Best for families with plenty of room who want a large but sociable companion with an almost dog-like character.",
  "bộ lông dài cần chải 2-3 lần/tuần; nên khám tim định kỳ vì giống này có nguy cơ bệnh cơ tim di truyền.":
    "The long coat needs brushing 2-3 times a week; book regular heart checks, as this breed is at risk of inherited heart disease.",
  "bộ lông dài cần chải 2-3 lần/tuần để tránh rối.":
    "The long coat needs brushing 2-3 times a week to prevent matting.",
  "ăn nhiều hơn giống mèo thường do thân hình lớn, cần khẩu phần phù hợp.":
    "Eats more than an average cat because of its size, so portion accordingly.",
  "kiểm tra tim định kỳ vì giống này có nguy cơ bệnh cơ tim di truyền.":
    "Have the heart checked regularly, as this breed is at risk of inherited heart disease.",
  "nguy cơ bệnh cơ tim di truyền — nên khám tim định kỳ":
    "Risk of inherited heart muscle disease — regular heart checks advised",

  // Ragdoll
  "mắt xanh biển, lông dài mềm mại. được gọi là 'búp bê vải' vì thả lỏng hoàn toàn khi được bế lên — cực kỳ ngoan và bám người.":
    "Ocean-blue eyes and a long, soft coat. Called a 'rag doll' because it goes completely limp when picked up — exceptionally well behaved and attached to its people.",
  "phù hợp gia đình có trẻ nhỏ, thích một bé mèo ngoan ngoãn, bám người và thả lỏng khi được bế.":
    "Best for families with young children who want a well-behaved cat that stays close and relaxes when picked up.",
  "xử lý nhẹ nhàng vì bé khá thả lỏng khi bế; chải lông 2-3 lần/tuần dù không quá rối như ba tư.":
    "Handle gently, as this cat goes limp when carried; brush 2-3 times a week, though it mats less than a Persian.",
  "tính cách thả lỏng khi bế nên dễ bị tổn thương nếu xử lý thô bạo.":
    "Because it goes limp when carried, it is easily hurt by rough handling.",
  "chải lông 2-3 lần/tuần dù lông không quá rối như ba tư.":
    "Brush 2-3 times a week, though the coat mats less than a Persian's.",
  "ưa thích ở trong nhà, không nên để bé ra ngoài một mình.":
    "Prefers to stay indoors; do not let it out on its own.",

  // ─── Tag tính cách bổ sung ────────────────────────────────────────────
  "hiếu động": "playful",
  "thích hơi ấm": "loves warmth",
  "ít kêu": "quiet",
  "lanh lợi": "sharp",
  "dũng cảm": "brave",
  "độc lập": "independent",
  "trầm tính": "reserved",
  "chín chắn": "level-headed",
  "hoà đồng": "sociable",
  "cảnh giác": "alert",

  // ─── Sphynx ───────────────────────────────────────────────────────────
  "mèo không lông": "The hairless cat",
  "không có lông nhưng da ấm như da đào, đôi tai lớn và ánh mắt sâu tạo vẻ ngoài không lẫn vào đâu được. cực kỳ tình cảm, thích rúc vào người để tìm hơi ấm.":
    "No coat, but skin as warm as a peach, with large ears and deep eyes that make this cat unmistakable. Extremely affectionate, and always burrowing against you for warmth.",
  "phù hợp người ở nhà nhiều, thích một bé mèo bám người và không ngại việc lau da định kỳ. cũng hợp gia đình ngại lông rụng khắp nhà.":
    "Best for owners who are home a lot, want a cat that stays close, and do not mind wiping the skin down regularly. Also suits households that dislike hair everywhere.",
  "không có lông không có nghĩa là dễ chăm: da cần lau sạch dầu 1-2 lần/tuần, cần giữ ấm mùa lạnh và che nắng khi ra ngoài.":
    "Hairless does not mean low-maintenance: the skin needs degreasing once or twice a week, warmth in cold weather, and shade outdoors.",
  "da trần dễ cháy nắng và nhiễm lạnh — cần kiểm soát nhiệt độ trong nhà":
    "Bare skin burns in the sun and chills easily — keep the indoor temperature comfortable",
  "lau người bằng khăn ẩm 1-2 lần/tuần vì không có lông thấm dầu, da dễ bết.":
    "Wipe them down with a damp cloth once or twice a week — with no coat to absorb it, skin oil builds up fast.",
  "giữ nhà đủ ấm và chuẩn bị áo mỏng khi trời lạnh hoặc phòng máy lạnh.":
    "Keep the house warm enough, and have a thin jumper ready for cold weather or an air-conditioned room.",
  "tránh nắng gắt — da trần rất dễ cháy nắng.":
    "Avoid harsh sun — bare skin sunburns very easily.",
  "vệ sinh tai và kẽ móng thường xuyên, hai chỗ này tích dầu nhanh nhất.":
    "Clean the ears and nail beds often; those two spots collect oil fastest.",

  // ─── British Longhair ─────────────────────────────────────────────────
  "mèo anh lông dài": "British Longhair cat",
  "cùng gương mặt tròn phúc hậu của mèo anh nhưng khoác bộ lông dài bồng bềnh. điềm đạm, ít kêu, thích nằm cạnh chủ hơn là leo trèo.":
    "The same round, kindly face as the British Shorthair, but under a long, billowing coat. Calm and quiet, and happier lying beside you than climbing.",
  "phù hợp gia đình thích một bé mèo trầm tính, hợp căn hộ, và có 5-10 phút mỗi ngày để chải lông.":
    "Best for families who want a quiet cat, live in an apartment, and have 5-10 minutes a day for brushing.",
  "bộ lông dài cần chải mỗi ngày để không bết; nên có thức ăn kiểm soát búi lông và theo dõi cân nặng.":
    "The long coat needs daily brushing to stay open; use a hairball control food and keep an eye on weight.",
  "chải lông mỗi ngày ở vùng nách, bẹn và yếm cổ — ba chỗ rối trước tiên.":
    "Brush the armpits, groin and ruff daily — those three mat first.",
  "tắm định kỳ 4-6 tuần/lần, sấy khô hoàn toàn để tránh nấm da.":
    "Bathe every 4-6 weeks and dry completely to avoid ringworm.",
  "dùng thức ăn kiểm soát búi lông vì bé nuốt nhiều lông khi tự liếm.":
    "Use a hairball control food, since they swallow a lot of hair while grooming.",
  "cân bé hằng tháng, giống này lười vận động và rất dễ tăng cân.":
    "Weigh them monthly; this breed is inactive and puts on weight easily.",

  // ─── Highland Fold ────────────────────────────────────────────────────
  "mèo tai cụp lông dài": "Longhaired fold-eared cat",
  "phiên bản lông dài của scottish fold: vẫn đôi tai cụp về trước và gương mặt tròn như cú mèo, nhưng khoác thêm lớp lông bồng bềnh mềm mại.":
    "The longhaired version of the Scottish Fold: the same forward-folded ears and round owl-like face, wrapped in a soft, billowing coat.",
  "phù hợp gia đình thích ôm ấp, sống ở nơi ổn định và sẵn sàng đưa bé khám khớp định kỳ.":
    "Best for families who love to cuddle, live somewhere settled, and are willing to book regular joint checks.",
  "chải lông hằng ngày và vệ sinh tai hằng tuần; khám khớp định kỳ vì gen tai cụp ảnh hưởng tới sụn.":
    "Brush daily and clean the ears weekly; book regular joint checks, since the folded-ear gene affects cartilage.",
  "chải lông mỗi ngày, chú ý vùng sau tai vì tai cụp che khuất dễ bỏ sót.":
    "Brush daily, paying attention behind the ears — the fold hides that spot and it gets missed.",
  "vệ sinh tai nhẹ nhàng mỗi tuần — tai cụp giữ ẩm nên dễ viêm hơn tai thẳng.":
    "Clean the ears gently every week — folded ears trap moisture and get infected more easily than upright ones.",
  "theo dõi khớp và dáng đi định kỳ, đặc biệt từ 2-3 tuổi trở đi.":
    "Watch the joints and the way they walk, particularly from two or three years old.",
  "bố trí bậc thấp lên giường, sofa để bé không phải nhảy cao.":
    "Add low steps up to the bed and sofa so they do not have to jump.",

  // ─── Munchkin Fold ────────────────────────────────────────────────────
  "mèo chân ngắn tai cụp": "Short-legged fold-eared cat",
  "kết hợp chân ngắn của munchkin với đôi tai cụp đặc trưng. dáng đi lạch bạch chậm rãi, gương mặt lúc nào cũng như đang ngơ ngác đòi bế.":
    "The Munchkin's short legs combined with the signature folded ears. A slow, waddling walk and a face that always looks like it is asking to be picked up.",
  "phù hợp người thích một bé mèo nhỏ, bám người, sống trong căn hộ và chấp nhận bố trí lại nhà cho bé đỡ phải nhảy cao.":
    "Best for owners who want a small, attached cat, live in an apartment, and are willing to rearrange the home so it does not have to jump.",
  "bé mang hai đặc điểm di truyền cần theo dõi: chân ngắn ảnh hưởng cột sống, tai cụp ảnh hưởng sụn khớp. khám định kỳ là bắt buộc.":
    "This cat carries two inherited traits that need monitoring: short legs affect the spine, folded ears affect joint cartilage. Regular check-ups are essential.",
  "vừa chân ngắn vừa tai cụp — cần khám cột sống và khớp định kỳ":
    "Both short-legged and fold-eared — regular spine and joint checks needed",
  "hạn chế để bé nhảy từ độ cao lớn — chân ngắn cộng cột sống dài là điểm yếu.":
    "Do not let them jump from a height — short legs on a long spine is the weak point.",
  "ưu tiên đồ chơi chơi được ở mặt đất thay vì kệ leo cao.":
    "Favour toys they can play with on the floor rather than high climbing shelves.",
  "khám cột sống và khớp mỗi lần đi kiểm tra sức khoẻ định kỳ.":
    "Have the spine and joints checked at every routine health visit.",

  // ─── Maltese ──────────────────────────────────────────────────────────
  "chó malta": "The Maltese",
  "bộ lông trắng dài buông thẳng như tơ, thân hình nhỏ nhắn cân đối. tình cảm, quấn chủ và thích được ở gần người cả ngày.":
    "A long white coat that falls straight like silk, on a small, well-balanced frame. Affectionate, devoted, and happiest near you all day.",
  "phù hợp căn hộ và người sống một mình hoặc gia đình ít vận động, thích một bé chó nhỏ luôn ở bên cạnh.":
    "Best for apartments and for people living alone or quieter households who want a small dog that is always at their side.",
  "lông trắng dài cần chải mỗi ngày và lau vùng mắt thường xuyên; bé khá bám người nên không hợp nhà vắng cả ngày.":
    "The long white coat needs daily brushing and frequent eye cleaning; they bond hard, so an empty house all day does not suit them.",
  "chải lông mỗi ngày nếu để lông dài; cắt ngắn kiểu puppy cut thì nhẹ hơn nhiều.":
    "Brush daily if you keep the coat long; a short puppy cut is far less work.",
  "lau vùng quanh mắt hằng ngày vì lông trắng rất dễ lộ vệt nước mắt.":
    "Clean around the eyes daily — tear stains show badly on white fur.",
  "cắt tỉa mỗi 4-6 tuần, đặc biệt gọn vùng bàn chân và hậu môn.":
    "Trim every 4-6 weeks, keeping the paws and rear especially tidy.",
  "tập cho bé quen ở một mình từ nhỏ để tránh lo âu chia ly.":
    "Teach them to be alone from an early age to head off separation anxiety.",

  // ─── Pomeranian ───────────────────────────────────────────────────────
  "phốc sóc": "The Pomeranian",
  "nhỏ như cục bông nhưng tự tin hơn kích thước rất nhiều. bộ lông kép dày dựng đứng quanh cổ, gương mặt lanh lợi như cáo con.":
    "Small as a puff of cotton but far bolder than the size suggests. A thick double coat standing up around the neck, and a sharp little fox-like face.",
  "phù hợp căn hộ và người thích một bé chó nhỏ nhưng cá tính. cân nhắc nếu chung cư có quy định nghiêm về tiếng ồn.":
    "Best for apartments and owners who want a small dog with a big personality. Think twice if your building has strict noise rules.",
  "lông kép cần chải 3-4 lần/tuần và không nên cạo sát; nên chăm răng sớm và tập giảm sủa từ nhỏ.":
    "The double coat needs brushing 3-4 times a week and should not be shaved down; start dental care early and work on the barking from puppyhood.",
  "xương khớp nhỏ, dễ trật xương bánh chè — hạn chế nhảy từ trên cao":
    "Small joints prone to luxating patella — limit jumping down from heights",
  "chải lông 3-4 lần/tuần, tăng lên hằng ngày trong mùa thay lông.":
    "Brush 3-4 times a week, daily during moulting season.",
  "không cạo sát lông — lớp lông kép có tác dụng cách nhiệt cả nóng lẫn lạnh.":
    "Do not shave the coat down — the double coat insulates against heat as well as cold.",
  "vệ sinh răng đều đặn, giống nhỏ rất dễ bị bệnh răng miệng sớm.":
    "Clean the teeth regularly; small breeds develop dental disease early.",
  "dạy lệnh im lặng từ nhỏ vì bé có xu hướng sủa báo động nhiều.":
    "Teach a quiet cue from an early age — this breed alert-barks a lot.",

  // ─── Dachshund ────────────────────────────────────────────────────────
  "chó lạp xưởng": "The sausage dog",
  "thân dài, chân ngắn và đôi tai to rủ xuống. vốn là giống chó săn nên bé dũng cảm, bền bỉ và có khứu giác rất nhạy.":
    "A long body, short legs and big drooping ears. Bred to hunt, so they are brave, tenacious and have a very keen nose.",
  "phù hợp gia đình ở nhà mặt đất hoặc căn hộ có thể bố trí dốc, chấp nhận theo dõi cột sống cho bé suốt đời.":
    "Best for households at ground level, or apartments where you can fit ramps, and owners willing to watch the spine for life.",
  "cột sống là điểm yếu lớn nhất: hạn chế nhảy cao, kiểm soát cân nặng và bế đúng cách.":
    "The spine is the big weakness: limit jumping, control weight, and lift them correctly.",
  "bệnh đĩa đệm rất phổ biến ở giống này — hạn chế nhảy và giữ cân chuẩn":
    "Disc disease is very common in this breed — limit jumping and keep the weight right",
  "tuyệt đối hạn chế nhảy từ ghế, giường xuống — dùng dốc thoải nếu bé hay lên sofa.":
    "Strictly limit jumping down from chairs and beds — use a gentle ramp if they like the sofa.",
  "bế bằng cách đỡ cả ngực và mông, không bao giờ nhấc bằng hai nách.":
    "Lift by supporting both chest and rear, never under the front legs alone.",
  "giữ cân nặng chuẩn, mỗi cân thừa là thêm áp lực lên cột sống.":
    "Keep them at a correct weight; every extra kilo loads the spine further.",
  "vệ sinh tai rủ định kỳ để tránh ẩm và viêm.":
    "Clean the drop ears regularly to avoid moisture and infection.",

  // ─── Chow Chow ────────────────────────────────────────────────────────
  "chó sư tử": "The lion dog",
  "bộ lông xù dày như bờm sư tử, dáng đi vững chãi và chiếc lưỡi xanh đen độc nhất. độc lập, trầm tính, trung thành với riêng gia đình mình.":
    "A thick, shaggy coat like a lion's mane, a solid rolling gait, and that unique blue-black tongue. Independent, reserved, and loyal to their own family alone.",
  "phù hợp gia đình có kinh nghiệm nuôi chó lớn, không gian mát mẻ và thời gian xã hội hoá cho bé từ nhỏ. không hợp người nuôi chó lần đầu.":
    "Best for families experienced with large dogs, with a cool space and time to socialise the puppy early. Not a first dog.",
  "bộ lông cực dày cần chải 3-4 lần/tuần và nơi ở mát mẻ; tính cách độc lập đòi hỏi chủ kiên nhẫn và xã hội hoá sớm.":
    "The very thick coat needs brushing 3-4 times a week and a cool place to live; the independent character needs a patient owner and early socialisation.",
  "rất dễ sốc nhiệt mùa hè việt nam — cần phòng mát và tránh nắng":
    "Very prone to heatstroke in a Vietnamese summer — needs a cool room and shade",
  "chải lông 3-4 lần/tuần quanh năm, hằng ngày trong mùa thay lông.":
    "Brush 3-4 times a week year-round, daily during moulting season.",
  "cần phòng mát và đủ nước mùa hè — bộ lông dày khiến bé rất dễ sốc nhiệt.":
    "Needs a cool room and plenty of water in summer — the dense coat makes heatstroke a real risk.",
  "xã hội hoá kỹ từ nhỏ vì bé khá dè chừng người lạ.":
    "Socialise thoroughly from an early age; they are wary of strangers.",
  "kiểm tra mắt định kỳ, giống này dễ gặp các vấn đề về mí mắt.":
    "Have the eyes checked regularly; this breed is prone to eyelid problems.",

  // ─── Bichon Frise ─────────────────────────────────────────────────────
  "chó bông gòn": "The cotton-ball dog",
  "bộ lông xoăn trắng bồng bềnh như cục bông, gần như không rụng. vui vẻ, hoà đồng và gắn bó với mọi thành viên trong nhà.":
    "A white curly coat as light as cotton wool, and almost no shedding. Cheerful, sociable, and attached to everyone in the household.",
  "phù hợp gia đình có trẻ nhỏ, người sống căn hộ, và ai ngại lông rụng nhưng chấp nhận chi phí cắt tỉa định kỳ.":
    "Best for families with young children, apartment dwellers, and anyone who dislikes shedding but accepts the cost of regular grooming.",
  "không rụng lông nhưng cần chải 3-4 lần/tuần và cắt tỉa mỗi 4-6 tuần; chú ý các vấn đề da liễu.":
    "Non-shedding, but needs brushing 3-4 times a week and a trim every 4-6 weeks; watch for skin problems.",
  "chải 3-4 lần/tuần: lông xoăn không rụng ra ngoài mà mắc lại trong bộ lông và bết rất nhanh.":
    "Brush 3-4 times a week: curly hair does not fall out but stays caught in the coat and mats very fast.",
  "cắt tỉa mỗi 4-6 tuần để giữ dáng bông tròn đặc trưng.":
    "Trim every 4-6 weeks to keep the signature round, powder-puff shape.",
  "theo dõi da — giống này hay bị dị ứng da và ngứa.":
    "Watch the skin — this breed is prone to allergies and itching.",

  // ─── Labrador Retriever ───────────────────────────────────────────────
  "chó labrador": "The Labrador",
  "thân hình săn chắc, ánh mắt hiền và tính cách hoà nhã đúng chuẩn chó gia đình. thông minh, dễ huấn luyện và cực kỳ kiên nhẫn với trẻ em.":
    "A solid build, a gentle eye, and the even temper of a proper family dog. Clever, easy to train, and extremely patient with children.",
  "phù hợp gia đình có sân vườn hoặc gần công viên, có thời gian vận động cùng bé mỗi ngày; rất hợp nhà có trẻ nhỏ.":
    "Best for families with a garden or a park nearby and time to exercise together every day; excellent with young children.",
  "cần vận động nhiều và kiểm soát khẩu phần nghiêm ngặt; béo phì là vấn đề phổ biến nhất của giống này.":
    "Needs plenty of exercise and strict portion control; obesity is this breed's most common problem.",
  "rất dễ béo phì và có nguy cơ loạn sản khớp háng — cần cân đúng khẩu phần":
    "Very prone to obesity, with a risk of hip dysplasia — measure the portions",
  "kiểm soát khẩu phần chặt chẽ — giống này ăn khoẻ và dễ béo phì bậc nhất.":
    "Control portions tightly — this breed eats enthusiastically and gains weight faster than almost any other.",
  "chải lông 2-3 lần/tuần, lông ngắn nhưng rụng đều quanh năm.":
    "Brush 2-3 times a week; the coat is short but sheds steadily all year.",

  // ─── Cardigan Welsh Corgi ─────────────────────────────────────────────
  "corgi có đuôi": "The tailed Corgi",
  "người anh em cổ hơn của pembroke, khác biệt ở chiếc đuôi dài như đuôi cáo và khung xương to chắc hơn. điềm đạm, chín chắn và bình tĩnh hơn.":
    "The older cousin of the Pembroke, set apart by a long fox-like tail and a heavier frame. Steadier, more level-headed and calmer.",
  "phù hợp gia đình muốn nét corgi nhưng thích tính cách điềm tĩnh hơn, có không gian và thời gian vận động cùng bé mỗi ngày.":
    "Best for families who want the Corgi look with a calmer temperament, and who have the space and time to exercise daily.",
  "cần vận động 30-45 phút/ngày và hạn chế nhảy cao; rụng lông theo mùa khá nhiều nên phải chải đều.":
    "Needs 30-45 minutes of exercise a day and limited jumping; seasonal shedding is heavy, so brush regularly.",
  "thân dài chân ngắn — cần cẩn thận cột sống như mọi dòng corgi":
    "A long body on short legs — the spine needs the same care as in any Corgi",
  "hạn chế nhảy từ trên cao xuống để bảo vệ cột sống, giống mọi giống thân dài chân ngắn.":
    "Limit jumping down from heights to protect the spine, as with any long-backed, short-legged breed.",
  "vận động đều 30-45 phút mỗi ngày, bé vốn là chó chăn gia súc nên cần việc để làm.":
    "Exercise steadily for 30-45 minutes a day; bred to herd, they need a job to do.",
  "giữ cân nặng chuẩn để giảm áp lực lên lưng và khớp.":
    "Keep them at a correct weight to reduce load on the back and joints.",
};
