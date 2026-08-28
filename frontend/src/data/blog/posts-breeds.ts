import { BlogPost } from "./types";

/** Cẩm nang: Giống, Chuẩn bị nuôi & Chuyện cửa hàng. */
export const BREED_POSTS: BlogPost[] = [
  {
    slug: "cho-poodle-tinh-cach-cham-soc-chi-phi",
    image: "/breeds/poodle-1.jpg",
    category: "breeds",
    date: "2026-08-19",
    readMinutes: 7,
    vi: {
      title: "Chó Poodle: Tính cách, cách chăm sóc và chi phí nuôi",
      excerpt:
        "Poodle thông minh, gần như không rụng lông nhưng cần chải và cắt tỉa đều. Tổng hợp những điều nên biết trước khi đón một bé về nhà.",
      blocks: [
        {
          t: "p",
          text: "Poodle là một trong những giống chó thông minh nhất và cũng là giống được nuôi nhiều nhất tại các thành phố lớn ở Việt Nam. Lý do dễ hiểu: bé nhỏ gọn, hợp căn hộ, gần như không rụng lông. Nhưng \"không rụng lông\" không có nghĩa là \"không cần chăm\" — thực tế ngược lại.",
        },
        { t: "h", text: "Các kích cỡ Poodle" },
        {
          t: "ul",
          items: [
            "Tiny/Toy: khoảng 2-4kg, phổ biến nhất ở Việt Nam, rất hợp căn hộ nhỏ.",
            "Miniature: khoảng 5-8kg, khoẻ hơn, vẫn dễ nuôi trong nhà phố.",
            "Standard: 20-32kg, cần không gian và vận động nhiều hơn hẳn.",
          ],
        },
        { t: "h", text: "Tính cách" },
        {
          t: "p",
          text: "Poodle học lệnh rất nhanh — thường chỉ cần vài chục lần lặp lại cho một lệnh cơ bản. Điều này vừa là ưu điểm vừa là thách thức: bé cũng học nhanh cả những thói quen bạn không muốn, ví dụ sủa để được chú ý. Bé quấn chủ mạnh và không thích bị bỏ một mình lâu.",
        },
        {
          t: "note",
          text: "Vì rất quấn chủ, Poodle nằm trong nhóm dễ bị lo âu chia ly. Nếu nhà bạn vắng người cả ngày, hãy chuẩn bị đồ chơi trí tuệ và tập cho bé quen ở một mình từ nhỏ.",
        },
        { t: "h", text: "Chăm sóc bộ lông" },
        {
          t: "p",
          text: "Lông Poodle mọc liên tục như tóc người thay vì rụng theo mùa. Lông chết không rơi ra mà mắc lại trong bộ lông xoăn, và đó là lý do lông bết rất nhanh nếu bỏ chải.",
        },
        {
          t: "ul",
          items: [
            "Chải 2-3 lần/tuần, tối thiểu.",
            "Cắt tỉa mỗi 4-6 tuần.",
            "Kiểm tra và vệ sinh tai thường xuyên — lông mọc trong ống tai giữ ẩm và gây viêm.",
            "Chú ý vùng quanh mắt, dễ đọng ghèn ở các bé màu sáng.",
          ],
        },
        { t: "h", text: "Chi phí nuôi hằng tháng (ước tính)" },
        {
          t: "ul",
          items: [
            "Thức ăn hạt cho bé nhỏ: khoảng 200.000 – 400.000đ.",
            "Cắt tỉa tại spa: khoảng 200.000 – 400.000đ mỗi 4-6 tuần.",
            "Phụ kiện, cát/tã, đồ chơi: khoảng 100.000 – 200.000đ.",
            "Dự phòng y tế và tiêm nhắc hằng năm: nên để dành khoảng 200.000đ/tháng.",
          ],
        },
        {
          t: "p",
          text: "Con số thực tế thay đổi theo kích cỡ bé và loại thức ăn bạn chọn, nhưng đây là khoảng để bạn hình dung trước khi quyết định.",
        },
        { t: "h", text: "Vấn đề sức khoẻ cần theo dõi" },
        {
          t: "p",
          text: "Poodle nhìn chung khoẻ và sống thọ, thường 12-15 năm. Cần lưu ý trật xương bánh chè ở các bé cỡ nhỏ, viêm tai tái phát, và các vấn đề về mắt khi lớn tuổi. Khám định kỳ mỗi năm là đủ với đa số trường hợp.",
        },
      ],
    },
    en: {
      title: "Poodles: temperament, grooming and what they cost to keep",
      excerpt:
        "Poodles are clever and shed almost nothing, but they need regular brushing and trimming. What to know before bringing one home.",
      blocks: [
        {
          t: "p",
          text: 'Poodles are among the most intelligent dog breeds and among the most popular in Vietnam\'s big cities. The reasons are obvious: compact, suited to apartments, and virtually non-shedding. But "does not shed" is not the same as "low maintenance" — in practice it is the opposite.',
        },
        { t: "h", text: "Poodle sizes" },
        {
          t: "ul",
          items: [
            "Tiny/Toy: around 2-4kg, the most common in Vietnam, and well suited to a small flat.",
            "Miniature: around 5-8kg, sturdier, still easy in a townhouse.",
            "Standard: 20-32kg, needing considerably more space and exercise.",
          ],
        },
        { t: "h", text: "Temperament" },
        {
          t: "p",
          text: "Poodles pick up commands very quickly — often only a few dozen repetitions for a basic cue. That is both a strength and a challenge: they learn the habits you did not want just as fast, such as barking for attention. They bond hard with their owner and dislike being left alone for long.",
        },
        {
          t: "note",
          text: "Because they bond so strongly, Poodles are prone to separation anxiety. If the house is empty all day, prepare puzzle toys and teach them to be alone from an early age.",
        },
        { t: "h", text: "Coat care" },
        {
          t: "p",
          text: "A Poodle's coat grows continuously like human hair rather than shedding seasonally. Dead hair does not fall out — it stays caught in the curls, which is exactly why the coat mats so fast if brushing is skipped.",
        },
        {
          t: "ul",
          items: [
            "Brush two to three times a week, minimum.",
            "Trim every 4-6 weeks.",
            "Check and clean the ears regularly — hair growing in the canal traps moisture and causes infections.",
            "Watch around the eyes, which stain easily on light-coloured dogs.",
          ],
        },
        { t: "h", text: "Estimated monthly cost" },
        {
          t: "ul",
          items: [
            "Kibble for a small dog: roughly 200,000 – 400,000₫.",
            "Salon trim: roughly 200,000 – 400,000₫ every 4-6 weeks.",
            "Accessories, pads, toys: roughly 100,000 – 200,000₫.",
            "Medical reserve and annual boosters: set aside about 200,000₫ a month.",
          ],
        },
        {
          t: "p",
          text: "The real figure varies with size and the food you choose, but this is the range to have in mind before deciding.",
        },
        { t: "h", text: "Health points to watch" },
        {
          t: "p",
          text: "Poodles are generally healthy and long-lived, typically 12-15 years. Watch for luxating patella in the smaller sizes, recurring ear infections, and eye problems in older age. An annual check-up covers most cases.",
        },
      ],
    },
  },

  {
    slug: "meo-anh-long-ngan-vi-sao-duoc-yeu-thich",
    image: "/breeds/british-shorthair-1.jpg",
    category: "breeds",
    date: "2026-08-15",
    readMinutes: 6,
    vi: {
      title: "Mèo Anh lông ngắn: Vì sao được yêu thích tại Việt Nam",
      excerpt:
        "Tính cách điềm đạm, ít kêu và bộ lông dễ chăm khiến British Shorthair là lựa chọn phổ biến cho gia đình có trẻ nhỏ.",
      blocks: [
        {
          t: "p",
          text: "Nếu phải chọn một giống mèo cho người lần đầu nuôi, British Shorthair gần như luôn nằm trong danh sách đầu. Không phải vì bé đẹp nhất, mà vì bé dễ sống cùng nhất.",
        },
        { t: "h", text: "Ngoại hình đặc trưng" },
        {
          t: "p",
          text: "Thân hình chắc và tròn, đầu to, má phính, mắt tròn lớn thường màu đồng hoặc cam. Bộ lông ngắn nhưng rất dày, sờ vào như nhung. Màu xanh xám (blue) là phổ biến nhất và cũng là màu nhiều người tìm, nhưng giống này còn có màu trắng, đen, kem, vàng và các dạng vằn.",
        },
        { t: "h", text: "Tính cách" },
        {
          t: "ul",
          items: [
            "Điềm đạm, ít kêu — hợp nhà chung cư và người thích yên tĩnh.",
            "Không quá bám người nhưng vẫn thích ở cùng phòng với chủ.",
            "Kiên nhẫn với trẻ nhỏ, ít phản ứng thái quá khi bị làm phiền.",
            "Không thích bị bế lâu — bé thích ngồi cạnh bạn hơn là ngồi trên đùi.",
            "Hoà thuận với chó và mèo khác nếu được giới thiệu từ từ.",
          ],
        },
        {
          t: "note",
          text: "Bé thích được ở gần chứ không thích bị ôm chặt. Đây là điểm khác biệt lớn so với Ragdoll, và là điều nên biết trước nếu bạn muốn một bé mèo hay nằm lòng.",
        },
        { t: "h", text: "Chăm sóc" },
        {
          t: "p",
          text: "Đây là phần dễ nhất. Lông ngắn dày chỉ cần chải 1-2 lần/tuần, tăng lên 2-3 lần trong mùa thay lông. Không cần cắt tỉa, không cần tắm thường xuyên.",
        },
        {
          t: "p",
          text: "Vấn đề thật sự là cân nặng. British Shorthair có xu hướng lười vận động và rất dễ béo. Béo phì ở mèo dẫn tới tiểu đường và viêm khớp, nên hãy cân bé mỗi tháng, đo khẩu phần bằng cốc đong, và duy trì đồ chơi vận động trong nhà.",
        },
        { t: "h", text: "Sức khoẻ" },
        {
          t: "p",
          text: "Nhìn chung là giống khoẻ, tuổi thọ 12-17 năm. Cần lưu ý bệnh cơ tim phì đại (HCM) có yếu tố di truyền ở giống này — nên siêu âm tim định kỳ theo tư vấn bác sĩ, đặc biệt với bé từ trại giống. Ngoài ra là bệnh thận đa nang, có thể tầm soát bằng xét nghiệm gen.",
        },
        { t: "h", text: "Có phù hợp với bạn không?" },
        {
          t: "p",
          text: "Phù hợp nếu bạn muốn một bé mèo dễ chăm, không ồn, hợp nhà có trẻ, và bạn ở căn hộ. Ít phù hợp nếu bạn muốn một bé mèo cực kỳ quấn quýt, hay leo trèo và luôn đòi được bế.",
        },
      ],
    },
    en: {
      title: "British Shorthairs: why they are so popular in Vietnam",
      excerpt:
        "A calm temperament, a quiet voice and an easy-care coat make the British Shorthair a favourite with families who have young children.",
      blocks: [
        {
          t: "p",
          text: "If you had to pick one cat breed for a first-time owner, the British Shorthair is almost always on the shortlist. Not because it is the most beautiful, but because it is the easiest to live with.",
        },
        { t: "h", text: "The look" },
        {
          t: "p",
          text: "A solid, rounded body, a broad head, full cheeks, and large round eyes usually copper or orange. The coat is short but very dense, and feels like velvet. Blue-grey is the most common and the most sought-after colour, though the breed also comes in white, black, cream, golden and various tabby patterns.",
        },
        { t: "h", text: "Temperament" },
        {
          t: "ul",
          items: [
            "Calm and quiet — well suited to a flat and to people who like a peaceful home.",
            "Not clingy, but likes to be in the same room as you.",
            "Patient with young children and slow to overreact when disturbed.",
            "Dislikes being held for long — prefers to sit beside you rather than on you.",
            "Gets on with dogs and other cats when introduced gradually.",
          ],
        },
        {
          t: "note",
          text: "They like being near you rather than being squeezed. That is a big difference from a Ragdoll, and worth knowing if you want a lap cat.",
        },
        { t: "h", text: "Care" },
        {
          t: "p",
          text: "This is the easy part. The short dense coat needs brushing once or twice a week, rising to two or three times during moulting. No trimming and no frequent bathing.",
        },
        {
          t: "p",
          text: "The real issue is weight. British Shorthairs tend to be inactive and put on weight easily. Feline obesity leads to diabetes and arthritis, so weigh them monthly, measure portions with a cup, and keep active toys in the house.",
        },
        { t: "h", text: "Health" },
        {
          t: "p",
          text: "Generally a robust breed, living 12-17 years. Watch for hypertrophic cardiomyopathy (HCM), which has a hereditary component in this breed — heart scans as advised by your vet are worthwhile, particularly for cattery-bred cats. Polycystic kidney disease is the other one, and can be screened for genetically.",
        },
        { t: "h", text: "Is it the right cat for you?" },
        {
          t: "p",
          text: "Yes if you want an easy-going, quiet cat that suits a household with children and an apartment. Less so if you want a cat that follows you everywhere, climbs constantly and asks to be picked up.",
        },
      ],
    },
  },

  {
    slug: "cho-corgi-giong-cho-chan-ngan-duoc-yeu-thich",
    image: "/breeds/corgi-1.jpg",
    category: "breeds",
    date: "2026-08-05",
    readMinutes: 6,
    vi: {
      title: "Chó Corgi: Giống chó chân ngắn được yêu thích nhất",
      excerpt:
        "Chân ngắn, mông tròn và tính cách vui vẻ khiến Corgi trở thành một trong những giống chó được tìm nhiều nhất hiện nay.",
      blocks: [
        {
          t: "p",
          text: "Corgi trông như một chú chó đồ chơi, nhưng nguồn gốc của bé là chó chăn gia súc xứ Wales. Điều đó giải thích gần như mọi thứ về tính cách bé: năng lượng cao, cảnh giác, thích có việc để làm và không ngại lên tiếng.",
        },
        { t: "h", text: "Tính cách thật sự" },
        {
          t: "ul",
          items: [
            "Rất năng động — cần vận động thực sự 30-45 phút mỗi ngày, không chỉ đi dạo thong thả.",
            "Thông minh và dễ huấn luyện, học lệnh cơ bản nhanh.",
            "Quấn chủ và hoà đồng với trẻ nhỏ.",
            "Sủa nhiều — bản năng chăn gia súc khiến bé cảnh báo mọi thứ chuyển động.",
            "Có thể cố \"lùa\" trẻ nhỏ bằng cách húc nhẹ vào gót chân; cần dạy lại từ sớm.",
          ],
        },
        {
          t: "note",
          text: "Nếu bạn sống ở chung cư có quy định về tiếng ồn, hãy cân nhắc kỹ. Sủa cảnh báo là đặc tính của giống này, tập giảm được nhưng không xoá bỏ được.",
        },
        { t: "h", text: "Cột sống — điều quan trọng nhất" },
        {
          t: "p",
          text: "Thân dài trên chân ngắn khiến cột sống Corgi chịu áp lực lớn hơn giống chó thông thường. Đây không phải chuyện nhỏ; bệnh đĩa đệm là vấn đề sức khoẻ hàng đầu của giống này.",
        },
        {
          t: "ol",
          items: [
            "Hạn chế cho bé nhảy từ ghế, giường hoặc cầu thang xuống. Dùng dốc thoải nếu bé quen nằm trên sofa.",
            "Giữ cân nặng chuẩn — mỗi cân thừa là thêm áp lực lên lưng.",
            "Bế bé bằng cách đỡ cả ngực và mông, không bao giờ nhấc bằng hai nách.",
            "Đi khám ngay nếu bé đột nhiên không muốn đi, kêu khi bị chạm vào lưng, hoặc kéo lê chân sau.",
          ],
        },
        { t: "h", text: "Rụng lông" },
        {
          t: "p",
          text: "Corgi có bộ lông kép và rụng nhiều — nhiều hơn hẳn kỳ vọng của phần lớn người mua lần đầu. Hai đợt thay lông mỗi năm gần như phủ trắng nhà. Chải 2-3 lần/tuần quanh năm và hằng ngày trong mùa thay lông là bắt buộc.",
        },
        { t: "h", text: "Phù hợp với ai" },
        {
          t: "p",
          text: "Phù hợp gia đình có sân hoặc gần công viên, có thời gian dắt bé vận động mỗi ngày, và không phiền lòng chuyện lông rụng. Ít phù hợp nếu bạn đi làm cả ngày và cần một bé chó im lặng.",
        },
      ],
    },
    en: {
      title: "Corgis: the short-legged breed everyone wants",
      excerpt:
        "Short legs, a round rear and a cheerful personality have made the Corgi one of the most sought-after breeds around.",
      blocks: [
        {
          t: "p",
          text: "A Corgi looks like a toy dog, but the breed was developed to herd cattle in Wales. That explains almost everything about their character: high energy, alertness, a need for a job, and no hesitation about speaking up.",
        },
        { t: "h", text: "What they are actually like" },
        {
          t: "ul",
          items: [
            "Genuinely energetic — 30-45 minutes of real exercise a day, not just a stroll.",
            "Clever and easy to train, picking up basic cues quickly.",
            "Attached to their owner and sociable with children.",
            "Vocal — the herding instinct means they announce anything that moves.",
            "May try to herd small children by nudging their heels; worth redirecting early.",
          ],
        },
        {
          t: "note",
          text: "If you live in a block with noise rules, think carefully. Alert barking is part of the breed. It can be reduced with training but not removed.",
        },
        { t: "h", text: "The spine — the thing that matters most" },
        {
          t: "p",
          text: "A long back on short legs puts far more load on a Corgi's spine than on an average dog. This is not a small point; disc disease is the breed's leading health problem.",
        },
        {
          t: "ol",
          items: [
            "Limit jumping down from chairs, beds and stairs. Use a ramp if they are used to the sofa.",
            "Keep them at a correct weight — every extra kilo is extra load on the back.",
            "Lift by supporting both chest and rear, never under the front legs alone.",
            "See a vet immediately if they suddenly refuse to walk, cry when their back is touched, or drag a hind leg.",
          ],
        },
        { t: "h", text: "Shedding" },
        {
          t: "p",
          text: "Corgis have a double coat and shed heavily — far more than most first-time buyers expect. Two moults a year will coat your home. Brushing two to three times a week year-round, and daily during a moult, is not optional.",
        },
        { t: "h", text: "Who they suit" },
        {
          t: "p",
          text: "A family with a yard or a park nearby, time to exercise the dog daily, and no objection to hair on the furniture. Less suitable if you are out all day and need a quiet dog.",
        },
      ],
    },
  },

  {
    slug: "meo-scottish-fold-va-luu-y-suc-khoe",
    image: "/breeds/scottish-fold-1.jpg",
    category: "breeds",
    date: "2026-08-03",
    readMinutes: 6,
    vi: {
      title: "Mèo Scottish Fold và những lưu ý sức khoẻ cần biết trước",
      excerpt:
        "Đôi tai cụp đáng yêu đến từ một đột biến gen ảnh hưởng tới sụn. Đây là điều bạn nên biết trước khi quyết định, chứ không phải sau.",
      blocks: [
        {
          t: "p",
          text: "Scottish Fold có lẽ là giống mèo dễ nhận ra nhất: đôi tai gập về phía trước tạo gương mặt tròn như cú mèo. Bé hiền lành, thích ôm ấp và cực kỳ dễ gần. Nhưng có một điều quan trọng mà người bán tử tế cần nói thẳng với bạn.",
        },
        { t: "h", text: "Tai cụp đến từ đâu" },
        {
          t: "p",
          text: "Đôi tai đặc trưng là kết quả của một đột biến gen ảnh hưởng tới sự phát triển sụn trên toàn cơ thể, không riêng gì tai. Cùng gen đó có thể ảnh hưởng tới sụn khớp, dẫn tới bệnh xương khớp gọi là osteochondrodysplasia.",
        },
        {
          t: "note",
          text: "Đây là lý do nhiều tổ chức nuôi mèo ở châu Âu không công nhận giống này. Chúng tôi nói điều này ra vì bạn nên biết trước khi mua, không phải sau khi bé đã ở nhà bạn hai năm.",
        },
        { t: "h", text: "Theo dõi gì" },
        {
          t: "ul",
          items: [
            "Dáng đi cứng, ngại nhảy lên cao hoặc ngại xuống thấp.",
            "Đuôi cứng, khó cong — dấu hiệu sớm thường bị bỏ qua.",
            "Chân sau to bất thường ở khớp cổ chân.",
            "Ít vận động hơn hẳn so với trước.",
            "Khám khớp định kỳ, đặc biệt từ 2-3 tuổi trở đi.",
          ],
        },
        { t: "h", text: "Chăm sóc thường ngày" },
        {
          t: "ul",
          items: [
            "Chải lông 2 lần/tuần với bé lông ngắn, nhiều hơn với bé lông dài (Highland Fold).",
            "Vệ sinh tai nhẹ nhàng — tai cụp giữ ẩm nhiều hơn nên dễ viêm.",
            "Giữ cân nặng chuẩn, vì thừa cân làm nặng thêm áp lực lên khớp.",
            "Bố trí chỗ nằm êm và các bậc thấp để bé không phải nhảy cao.",
            "Không gian sống ổn định — bé khá nhạy cảm với thay đổi môi trường.",
          ],
        },
        { t: "h", text: "Vẫn là một bé mèo tuyệt vời" },
        {
          t: "p",
          text: "Rất nhiều bé Scottish Fold sống khoẻ mạnh và hạnh phúc cả đời. Điểm mấu chốt là chọn nguồn giống có trách nhiệm, khám khớp định kỳ và giữ cân nặng. Ở MiewwL Pet House, mỗi bé Scottish Fold đều được bàn giao kèm ghi chú về đặc điểm này — bạn có quyền biết đầy đủ trước khi quyết định.",
        },
      ],
    },
    en: {
      title: "Scottish Folds and the health facts to know first",
      excerpt:
        "Those charming folded ears come from a gene mutation that affects cartilage. This is something to know before you decide, not after.",
      blocks: [
        {
          t: "p",
          text: "The Scottish Fold is probably the most instantly recognisable cat breed: ears folded forward giving an owl-like round face. They are gentle, love being cuddled and are exceptionally easy to get along with. But there is one important thing an honest seller should tell you plainly.",
        },
        { t: "h", text: "Where the folded ears come from" },
        {
          t: "p",
          text: "The signature ears are the result of a gene mutation affecting cartilage development throughout the body, not just in the ear. The same gene can affect joint cartilage, leading to a skeletal condition called osteochondrodysplasia.",
        },
        {
          t: "note",
          text: "This is why several European cat registries do not recognise the breed. We say it because you should know before buying, not two years after the cat is living with you.",
        },
        { t: "h", text: "What to watch for" },
        {
          t: "ul",
          items: [
            "A stiff gait, reluctance to jump up or come down.",
            "A stiff tail that will not curve easily — an early sign that often gets missed.",
            "Unusually thick hind legs at the hock joint.",
            "Noticeably less activity than before.",
            "Regular joint checks, particularly from two or three years old.",
          ],
        },
        { t: "h", text: "Everyday care" },
        {
          t: "ul",
          items: [
            "Brush twice a week for shorthairs, more for the longhaired Highland Fold.",
            "Clean the ears gently — folded ears trap more moisture and are prone to infection.",
            "Keep them at a healthy weight, since extra weight loads the joints further.",
            "Provide soft bedding and low steps so they do not have to jump high.",
            "A stable home — they are fairly sensitive to changes in their environment.",
          ],
        },
        { t: "h", text: "Still a wonderful cat" },
        {
          t: "p",
          text: "Many Scottish Folds live healthy, happy lives. What matters is a responsible source, regular joint checks and a controlled weight. At MiewwL Pet House every Scottish Fold is handed over with a note about this trait — you have a right to the full picture before you decide.",
        },
      ],
    },
  },

  {
    slug: "chuan-bi-gi-truoc-khi-don-be-ve-nha",
    image: "/breeds/ragdoll-2.jpg",
    category: "starting",
    date: "2026-08-10",
    readMinutes: 6,
    vi: {
      title: "Chuẩn bị gì trước khi đón bé về nhà",
      excerpt:
        "Từ chỗ ngủ, khay cát tới lịch ăn — chuẩn bị kỹ trước một tuần giúp bé bớt bỡ ngỡ và bạn cũng đỡ vất vả hơn nhiều.",
      blocks: [
        {
          t: "p",
          text: "Ngày đầu tiên ở nhà mới là ngày căng thẳng nhất trong đời một bé thú cưng nhỏ. Bé vừa rời mẹ, rời anh chị em, rời mọi mùi quen thuộc. Chuẩn bị trước không phải để nhà bạn trông chỉn chu, mà để bé có ít thứ phải thích nghi cùng lúc nhất có thể.",
        },
        { t: "h", text: "Danh sách mua sắm" },
        {
          t: "ul",
          items: [
            "Bát ăn và bát nước riêng, loại inox hoặc sứ, có đế chống trượt.",
            "Thức ăn ĐÚNG loại bé đang dùng ở nơi cũ (rất quan trọng, xem mục dưới).",
            "Ổ nằm hoặc nệm, đặt ở nơi yên tĩnh.",
            "Với mèo: khay cát, cát, xẻng xúc và trụ cào móng.",
            "Với chó: vòng cổ có thẻ tên, dây dắt, tã lót hoặc khay vệ sinh.",
            "Đồ chơi phù hợp độ tuổi và đồ gặm nếu là chó con.",
            "Lược chải phù hợp loại lông.",
            "Lồng vận chuyển để đưa bé về và đi khám sau này.",
          ],
        },
        { t: "h", text: "Chuẩn bị không gian" },
        {
          t: "ol",
          items: [
            "Chọn một phòng làm \"phòng an toàn\" cho tuần đầu, có đủ ổ nằm, bát ăn, khay cát (đặt xa bát ăn).",
            "Dọn hết dây điện trong tầm với, cất thuốc, hoá chất và cây cảnh độc.",
            "Chặn các khe hẹp sau tủ, dưới máy giặt — mèo con rất giỏi chui vào chỗ bạn không lấy ra được.",
            "Đóng cửa sổ hoặc lắp lưới an toàn, đặc biệt ở chung cư tầng cao.",
          ],
        },
        {
          t: "note",
          text: "Giữ nguyên loại thức ăn bé đang ăn trong ít nhất một tuần đầu. Về nhà mới đã đủ căng thẳng; đổi thức ăn cùng lúc gần như chắc chắn gây tiêu chảy.",
        },
        { t: "h", text: "Ba ngày đầu tiên" },
        {
          t: "ul",
          items: [
            "Giữ bé trong phòng an toàn, mở rộng dần khi bé đã tự tin.",
            "Hạn chế khách tới thăm — càng ít người lạ càng tốt trong tuần đầu.",
            "Nói nhỏ, di chuyển chậm, để bé chủ động đến gần bạn.",
            "Với chó con, thiết lập lịch cho ăn và đi vệ sinh cố định ngay từ ngày đầu.",
            "Đừng lo nếu bé ăn ít trong 1-2 ngày đầu; nhưng mèo bỏ ăn quá 24 giờ thì cần đi khám.",
          ],
        },
        { t: "h", text: "Trong tuần đầu" },
        {
          t: "p",
          text: "Đặt lịch khám tổng quát với bác sĩ thú y trong vòng 3-7 ngày sau khi nhận bé, mang theo sổ tiêm phòng. Đây vừa là kiểm tra sức khoẻ, vừa là dịp để bạn hỏi mọi thắc mắc và lập lịch tiêm nhắc.",
        },
      ],
    },
    en: {
      title: "What to prepare before bringing your pet home",
      excerpt:
        "From the bed and litter tray to the feeding routine — a week of preparation makes the move far easier on your new pet, and on you.",
      blocks: [
        {
          t: "p",
          text: "The first day in a new home is the most stressful day in a young animal's life. They have just left their mother, their littermates and every familiar smell. Preparing in advance is not about making your home look tidy; it is about giving them as few things as possible to adapt to at once.",
        },
        { t: "h", text: "Shopping list" },
        {
          t: "ul",
          items: [
            "Separate food and water bowls, stainless steel or ceramic, with a non-slip base.",
            "The SAME food they were eating before (this matters — see below).",
            "A bed or mat, in a quiet spot.",
            "For cats: litter tray, litter, scoop and a scratching post.",
            "For dogs: collar with an ID tag, lead, and pads or a toilet tray.",
            "Age-appropriate toys, plus chew toys for a puppy.",
            "A brush suited to the coat type.",
            "A carrier, both for the journey home and for vet visits later.",
          ],
        },
        { t: "h", text: "Preparing the space" },
        {
          t: "ol",
          items: [
            'Pick one room as a "safe room" for the first week, with a bed, food bowls and litter tray (kept well away from the food).',
            "Clear away reachable cables, and put medicines, chemicals and toxic houseplants out of reach.",
            "Block narrow gaps behind cupboards and under the washing machine — kittens are excellent at getting into places you cannot get them out of.",
            "Close windows or fit safety mesh, especially in a high-rise flat.",
          ],
        },
        {
          t: "note",
          text: "Keep them on their existing food for at least the first week. Moving home is stressful enough; changing the food at the same time will almost certainly cause diarrhoea.",
        },
        { t: "h", text: "The first three days" },
        {
          t: "ul",
          items: [
            "Keep them in the safe room and open up the house as their confidence grows.",
            "Limit visitors — the fewer strangers in the first week, the better.",
            "Speak quietly, move slowly, and let them choose to approach you.",
            "For a puppy, set the feeding and toileting routine from day one.",
            "Do not worry if they eat little for a day or two; but a cat that eats nothing for 24 hours needs a vet.",
          ],
        },
        { t: "h", text: "During the first week" },
        {
          t: "p",
          text: "Book a general check-up with a vet within three to seven days of collection, and bring the vaccination record. It is both a health check and your chance to ask everything you want to ask and plan the booster schedule.",
        },
      ],
    },
  },

  {
    slug: "chi-phi-nuoi-cho-meo-mot-thang",
    image: "/supplies/bat-an-doi-inox-de-chong-truot-1.jpg",
    category: "starting",
    date: "2026-08-01",
    readMinutes: 6,
    vi: {
      title: "Nuôi một bé chó hoặc mèo tốn bao nhiêu một tháng?",
      excerpt:
        "Giá mua chỉ là khoản đầu tiên. Đây là bảng chi phí thực tế theo tháng và theo năm để bạn cân nhắc trước khi quyết định.",
      blocks: [
        {
          t: "p",
          text: "Câu hỏi này ít người hỏi trước khi mua, và đó chính là lý do nhiều bé bị trả lại hoặc bỏ rơi sau vài tháng. Chúng tôi thà bạn tính kỹ rồi mới quyết định, còn hơn đón bé về rồi mới thấy quá sức.",
        },
        { t: "h", text: "Chi phí ban đầu (một lần)" },
        {
          t: "ul",
          items: [
            "Bát ăn, bát nước: 100.000 – 250.000đ",
            "Ổ nằm/nệm: 150.000 – 500.000đ",
            "Lồng vận chuyển: 300.000 – 700.000đ",
            "Khay cát + xẻng (mèo): 150.000 – 400.000đ",
            "Trụ cào móng (mèo): 200.000 – 800.000đ",
            "Vòng cổ, dây dắt (chó): 100.000 – 300.000đ",
            "Đồ chơi, lược chải: 150.000 – 400.000đ",
            "Triệt sản (nên làm, một lần): 700.000 – 2.500.000đ",
          ],
        },
        { t: "h", text: "Chi phí hằng tháng" },
        {
          t: "ul",
          items: [
            "Thức ăn (bé nhỏ 3-5kg): 250.000 – 500.000đ",
            "Thức ăn (bé lớn 20kg+): 600.000 – 1.200.000đ",
            "Cát vệ sinh (mèo): 100.000 – 200.000đ",
            "Spa, cắt tỉa (giống lông dài/xoăn): 200.000 – 400.000đ",
            "Đồ chơi, phụ kiện thay mới: 50.000 – 150.000đ",
            "Quỹ dự phòng y tế: nên để 200.000 – 400.000đ",
          ],
        },
        { t: "h", text: "Chi phí hằng năm" },
        {
          t: "ul",
          items: [
            "Tiêm nhắc và khám định kỳ: 500.000 – 1.500.000đ",
            "Tẩy giun, phòng ve rận: 300.000 – 800.000đ",
            "Khám răng, cạo vôi (nếu cần): 800.000 – 2.000.000đ",
          ],
        },
        {
          t: "note",
          text: "Khoản khó dự đoán nhất là chi phí y tế đột xuất. Một ca phẫu thuật hoặc điều trị nội trú vài ngày có thể lên tới hàng chục triệu. Hãy để dành một quỹ nhỏ đều đặn thay vì hy vọng không có gì xảy ra.",
        },
        { t: "h", text: "Tổng kết thực tế" },
        {
          t: "p",
          text: "Với một bé mèo hoặc chó cỡ nhỏ, chi phí thường rơi vào khoảng 700.000 – 1.500.000đ mỗi tháng nếu mọi thứ suôn sẻ. Với chó cỡ lớn hoặc giống cần cắt tỉa thường xuyên, con số này có thể gấp đôi. Nhân với tuổi thọ 12-15 năm, đây là một cam kết tài chính dài hạn thật sự.",
        },
        {
          t: "p",
          text: "Nói vậy không phải để can bạn. Chỉ là chúng tôi tin rằng một quyết định được cân nhắc kỹ sẽ tốt cho cả bạn lẫn bé.",
        },
      ],
    },
    en: {
      title: "What does a dog or cat actually cost per month?",
      excerpt:
        "The purchase price is only the first line. Here is a realistic monthly and yearly breakdown to weigh up before you decide.",
      blocks: [
        {
          t: "p",
          text: "Few people ask this before buying, and that is exactly why so many pets are returned or abandoned after a few months. We would rather you did the maths first than found out afterwards that it was too much.",
        },
        { t: "h", text: "One-off setup costs" },
        {
          t: "ul",
          items: [
            "Food and water bowls: 100,000 – 250,000₫",
            "Bed or mat: 150,000 – 500,000₫",
            "Carrier: 300,000 – 700,000₫",
            "Litter tray and scoop (cats): 150,000 – 400,000₫",
            "Scratching post (cats): 200,000 – 800,000₫",
            "Collar and lead (dogs): 100,000 – 300,000₫",
            "Toys and a brush: 150,000 – 400,000₫",
            "Neutering (recommended, one-off): 700,000 – 2,500,000₫",
          ],
        },
        { t: "h", text: "Monthly costs" },
        {
          t: "ul",
          items: [
            "Food (small pet, 3-5kg): 250,000 – 500,000₫",
            "Food (large dog, 20kg+): 600,000 – 1,200,000₫",
            "Cat litter: 100,000 – 200,000₫",
            "Grooming (long or curly coats): 200,000 – 400,000₫",
            "Replacement toys and accessories: 50,000 – 150,000₫",
            "Medical reserve: set aside 200,000 – 400,000₫",
          ],
        },
        { t: "h", text: "Yearly costs" },
        {
          t: "ul",
          items: [
            "Boosters and check-ups: 500,000 – 1,500,000₫",
            "Worming and flea/tick prevention: 300,000 – 800,000₫",
            "Dental check and scaling if needed: 800,000 – 2,000,000₫",
          ],
        },
        {
          t: "note",
          text: "The hardest line to predict is unexpected veterinary care. A single operation or a few days of inpatient treatment can run into tens of millions of dong. Build a small fund steadily rather than hoping nothing happens.",
        },
        { t: "h", text: "The realistic total" },
        {
          t: "p",
          text: "For a cat or a small dog, expect roughly 700,000 – 1,500,000₫ a month when everything goes smoothly. For a large dog or a breed needing regular trims, that can double. Multiplied across a 12-15 year lifespan, this is a genuine long-term financial commitment.",
        },
        {
          t: "p",
          text: "None of this is meant to put you off. We simply believe a decision made with open eyes is better for you and for the animal.",
        },
      ],
    },
  },

  {
    slug: "vi-sao-miewwl-pet-house-chon-trai-giong-ky-luong",
    image: "/breeds/golden-retriever-3.jpg",
    category: "shop",
    date: "2026-08-06",
    readMinutes: 5,
    vi: {
      title: "Vì sao MiewwL Pet House chọn từng trại giống kỹ lưỡng",
      excerpt:
        "Không phải trại giống nào cũng được hợp tác. Đây là những tiêu chí chúng mình kiểm tra trước khi nhận một bé về cửa hàng.",
      blocks: [
        {
          t: "p",
          text: "Một cửa hàng thú cưng có thể lấy hàng theo hai cách. Cách nhanh là nhận bất kỳ bé nào có người chào bán, giá tốt là được. Cách chậm là đi xem tận nơi, hỏi kỹ và từ chối phần lớn. Chúng mình chọn cách thứ hai, và bài này giải thích vì sao.",
        },
        { t: "h", text: "Chúng mình kiểm tra gì" },
        {
          t: "ol",
          items: [
            "Đến tận trại xem điều kiện nuôi thực tế, không chỉ xem ảnh và video được gửi.",
            "Xem chó mẹ, mèo mẹ — tình trạng của mẹ nói lên nhiều điều về cách trại vận hành.",
            "Hỏi số lứa mỗi năm. Trại ép sinh sản liên tục là dấu hiệu loại ngay.",
            "Yêu cầu hồ sơ tiêm phòng, tẩy giun và lịch sử sức khoẻ của từng bé.",
            "Với các giống có bệnh di truyền đã biết, hỏi kết quả tầm soát của bố mẹ.",
            "Xem bé có được tiếp xúc với người và với anh chị em đủ lâu trước khi tách mẹ hay không.",
          ],
        },
        {
          t: "note",
          text: "Chúng mình không nhận bé dưới 8 tuần tuổi. Tách mẹ quá sớm ảnh hưởng tới cả miễn dịch lẫn hành vi của bé về sau, dù bé trông rất đáng yêu ở tuổi đó.",
        },
        { t: "h", text: "Trước khi bé lên kệ" },
        {
          t: "ul",
          items: [
            "Khám sức khoẻ tổng quát tại phòng khám thú y.",
            "Tẩy giun và tiêm phòng theo đúng lịch tuổi.",
            "Theo dõi ăn uống, đi vệ sinh và hành vi trong vài ngày đầu tại cửa hàng.",
            "Ghi lại hồ sơ đầy đủ để bàn giao cho bạn.",
          ],
        },
        { t: "h", text: "Những gì chúng mình nói thẳng" },
        {
          t: "p",
          text: "Nếu một giống có đặc điểm sức khoẻ cần lưu ý — cột sống của Corgi, sụn khớp của Scottish Fold, đường thở của các giống mũi ngắn — chúng mình nói với bạn trước khi bạn quyết định, chứ không phải sau. Bạn có quyền biết mình đang cam kết điều gì trong 12-15 năm tới.",
        },
        { t: "h", text: "Chính sách bảo hành sức khoẻ" },
        {
          t: "p",
          text: "Chính vì quy trình trên mà mọi bé tại MiewwL Pet House đều đi kèm chính sách bảo hành sức khoẻ. Chúng mình chỉ dám cam kết điều đó khi biết rõ bé đến từ đâu và đã trải qua những gì.",
        },
      ],
    },
    en: {
      title: "Why MiewwL Pet House vets every breeder so carefully",
      excerpt:
        "Not every breeder gets to work with us. These are the things we check before taking a pet into the shop.",
      blocks: [
        {
          t: "p",
          text: "A pet shop can source stock in one of two ways. The fast way is to take whatever is offered at a good price. The slow way is to visit in person, ask hard questions and turn most of it down. We chose the second, and this article explains why.",
        },
        { t: "h", text: "What we check" },
        {
          t: "ol",
          items: [
            "Visit the premises to see the actual conditions, not just the photos and videos they send.",
            "Meet the mother — her condition says a great deal about how the place is run.",
            "Ask how many litters a year. Continuous breeding is an immediate disqualification.",
            "Require vaccination records, worming history and individual health notes.",
            "For breeds with known hereditary conditions, ask for the parents' screening results.",
            "Check that the young animals had enough contact with people and littermates before leaving the mother.",
          ],
        },
        {
          t: "note",
          text: "We do not take animals under eight weeks old. Separating too early affects both immunity and later behaviour, however appealing they look at that age.",
        },
        { t: "h", text: "Before they go on the floor" },
        {
          t: "ul",
          items: [
            "A general health examination at a veterinary clinic.",
            "Worming and vaccination on the correct schedule for their age.",
            "A few days of observed eating, toileting and behaviour at the shop.",
            "A complete record written up and handed to you.",
          ],
        },
        { t: "h", text: "What we tell you plainly" },
        {
          t: "p",
          text: "If a breed comes with a health consideration — a Corgi's spine, a Scottish Fold's joint cartilage, a flat-faced breed's airway — we tell you before you decide, not after. You have a right to know what you are committing to for the next 12-15 years.",
        },
        { t: "h", text: "The health warranty" },
        {
          t: "p",
          text: "It is because of that process that every pet from MiewwL Pet House comes with a health warranty. We only feel able to promise that when we know exactly where an animal came from and what it has been through.",
        },
      ],
    },
  },
];
