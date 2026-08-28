import { BlogPost } from "./types";

/**
 * Cẩm nang: Sức khoẻ & Dinh dưỡng.
 *
 * Nội dung do cửa hàng tự biên soạn, không sao chép nguồn khác. Đây là kiến
 * thức chăm sóc thường ngày — mọi dấu hiệu bất thường vẫn phải đưa bé đi khám,
 * và các bài viết đều nói rõ điều đó thay vì thay thế bác sĩ thú y.
 */
export const HEALTH_POSTS: BlogPost[] = [
  {
    slug: "dau-hieu-meo-bi-stress-va-cach-xu-ly",
    image: "/breeds/maine-coon-4.jpg",
    category: "health",
    date: "2026-08-20",
    readMinutes: 6,
    featured: true,
    vi: {
      title: "Dấu hiệu mèo bị stress và cách xử lý tại nhà",
      excerpt:
        "Mèo hay trốn, bỏ ăn hoặc liếm lông quá mức có thể là dấu hiệu stress. Nhận biết sớm và vài cách đơn giản giúp bé thoải mái trở lại.",
      blocks: [
        {
          t: "p",
          text: "Mèo là loài cực kỳ nhạy cảm với thay đổi môi trường. Chuyển nhà, có thêm thành viên mới, hàng xóm sửa nhà ồn ào, hay đơn giản là bạn xê dịch vị trí khay cát — tất cả đều đủ khiến một bé mèo đang bình thường trở nên căng thẳng.",
        },
        {
          t: "p",
          text: "Điều khó là mèo giấu cảm xúc rất giỏi. Bé sẽ không kêu than như chó, mà thể hiện qua những thay đổi nhỏ trong sinh hoạt. Nếu không để ý, chủ thường chỉ phát hiện khi tình trạng đã kéo dài vài tuần.",
        },
        { t: "h", text: "Những dấu hiệu dễ nhận ra nhất" },
        {
          t: "ul",
          items: [
            "Trốn nhiều hơn hẳn bình thường — chui gầm giường, sau tủ, và ở lì đó cả ngày.",
            "Ăn ít đi hoặc bỏ bữa, dù thức ăn không đổi.",
            "Liếm lông quá mức tới rụng thành mảng, thường ở bụng hoặc mặt trong đùi.",
            "Đi vệ sinh ra ngoài khay cát dù trước giờ vẫn dùng đúng.",
            "Kêu nhiều hơn, nhất là ban đêm.",
            "Gầm gừ hoặc cào cắn khi được bế — trong khi trước đây bé rất ngoan.",
          ],
        },
        {
          t: "note",
          text: "Đi vệ sinh sai chỗ và bỏ ăn cũng là dấu hiệu của bệnh đường tiết niệu và nhiều bệnh khác. Đừng mặc định là stress — nếu kéo dài quá 2-3 ngày, hãy cho bé đi khám trước đã.",
        },
        { t: "h", text: "Những nguyên nhân thường gặp" },
        {
          t: "ol",
          items: [
            "Thay đổi không gian sống: chuyển nhà, đổi phòng, sắp xếp lại đồ đạc.",
            "Có thêm thú cưng mới hoặc em bé mới trong nhà.",
            "Khay cát bẩn, đặt ở nơi ồn ào hoặc quá gần chỗ ăn.",
            "Bị nhốt lâu trong không gian chật, không có chỗ leo trèo hay quan sát.",
            "Chủ vắng nhà dài ngày, lịch sinh hoạt đảo lộn.",
          ],
        },
        { t: "h", text: "Xử lý tại nhà" },
        {
          t: "p",
          text: "Nguyên tắc chung là trả lại cho bé cảm giác kiểm soát được môi trường của mình. Cụ thể:",
        },
        {
          t: "ul",
          items: [
            "Giữ lịch sinh hoạt cố định: cho ăn đúng giờ, dọn khay cát đúng giờ.",
            "Dành một góc riêng yên tĩnh có ổ nằm, nơi không ai làm phiền bé.",
            "Bổ sung chỗ leo cao — mèo thấy an toàn hơn khi quan sát được cả phòng từ trên cao.",
            "Mỗi ngày chơi cùng bé 10-15 phút bằng cần câu lông vũ để giải toả năng lượng.",
            "Nếu vừa chuyển nhà, hãy cho bé làm quen từng phòng một thay vì thả tự do cả căn nhà ngay.",
          ],
        },
        {
          t: "p",
          text: "Phần lớn trường hợp, bé sẽ trở lại bình thường trong vòng 1-2 tuần. Nếu quá thời gian đó mà vẫn bỏ ăn, rụng lông thành mảng hoặc đi vệ sinh sai chỗ, hãy đưa bé tới bác sĩ thú y để loại trừ nguyên nhân bệnh lý.",
        },
      ],
    },
    en: {
      title: "Signs your cat is stressed, and what to do at home",
      excerpt:
        "Hiding, skipping meals or over-grooming can all point to stress. Here's how to spot it early and a few simple ways to settle your cat again.",
      blocks: [
        {
          t: "p",
          text: "Cats are extremely sensitive to changes in their environment. Moving house, a new family member, noisy building work next door, or simply shifting the litter tray to another corner — any of these is enough to unsettle a cat that was perfectly fine the week before.",
        },
        {
          t: "p",
          text: "The tricky part is that cats hide their feelings well. They will not complain the way a dog does; instead it shows up as small changes in routine. Owners often only notice once it has been going on for weeks.",
        },
        { t: "h", text: "The signs that are easiest to spot" },
        {
          t: "ul",
          items: [
            "Hiding far more than usual — under the bed, behind a cupboard, and staying there all day.",
            "Eating less or skipping meals, even though the food has not changed.",
            "Grooming so much that patches of fur come away, usually on the belly or inner thigh.",
            "Toileting outside the litter tray after months of using it properly.",
            "Meowing more, especially at night.",
            "Growling or scratching when picked up, when they used to be perfectly happy about it.",
          ],
        },
        {
          t: "note",
          text: "Toileting in the wrong place and going off food are also signs of urinary disease and several other conditions. Do not assume stress — if it lasts more than two or three days, get your cat checked first.",
        },
        { t: "h", text: "Common causes" },
        {
          t: "ol",
          items: [
            "A change of living space: moving house, changing rooms, rearranging the furniture.",
            "A new pet or a new baby in the household.",
            "A dirty litter tray, or one placed somewhere noisy or too close to the food.",
            "Being shut in a cramped space with nowhere to climb or watch from.",
            "The owner away for a long stretch, throwing the daily routine off.",
          ],
        },
        { t: "h", text: "What to do at home" },
        {
          t: "p",
          text: "The general principle is to give your cat back a sense of control over its environment. In practice:",
        },
        {
          t: "ul",
          items: [
            "Keep the routine fixed: feed at the same times, clean the tray at the same times.",
            "Set aside a quiet corner with a bed where nobody disturbs them.",
            "Add somewhere high to climb — cats feel safer when they can survey the whole room from above.",
            "Play with them for 10-15 minutes a day with a feather wand to burn off energy.",
            "After a move, introduce one room at a time rather than opening up the whole house at once.",
          ],
        },
        {
          t: "p",
          text: "In most cases your cat will be back to normal within one to two weeks. If it takes longer and they are still off their food, losing patches of fur or toileting in the wrong places, take them to a vet to rule out an underlying illness.",
        },
      ],
    },
  },

  {
    slug: "lich-tiem-phong-cho-cho-meo-con",
    image: "/blog/kitten.jpg",
    category: "health",
    date: "2026-08-16",
    readMinutes: 5,
    vi: {
      title: "Lịch tiêm phòng cho chó mèo con bạn cần nhớ",
      excerpt:
        "Tiêm phòng đúng lịch là bước quan trọng nhất trong 6 tháng đầu đời của bé. Đây là mốc thời gian cơ bản bạn nên theo dõi.",
      blocks: [
        {
          t: "p",
          text: "Trong vài tuần đầu, bé còn kháng thể từ sữa mẹ nên tương đối an toàn. Nhưng lượng kháng thể đó giảm dần, và khoảng thời gian giữa lúc kháng thể mẹ hết tác dụng và lúc vắc-xin phát huy hiệu lực chính là lúc bé dễ tổn thương nhất. Tiêm đúng lịch là để rút ngắn khoảng trống đó.",
        },
        { t: "h", text: "Mốc thời gian cơ bản" },
        {
          t: "ol",
          items: [
            "6-8 tuần tuổi: mũi vắc-xin tổng hợp đầu tiên.",
            "9-12 tuần tuổi: mũi nhắc lại lần một.",
            "12-16 tuần tuổi: mũi nhắc lại lần hai, kết thúc đợt cơ bản.",
            "Từ 12 tuần tuổi trở lên: tiêm phòng dại (thường tiêm cùng hoặc ngay sau mũi nhắc).",
            "Hằng năm: tiêm nhắc lại theo chỉ định của bác sĩ.",
          ],
        },
        {
          t: "note",
          text: "Đây là khung tham khảo phổ biến. Lịch cụ thể phụ thuộc loại vắc-xin, tình trạng sức khoẻ và khuyến cáo của bác sĩ thú y — hãy hỏi bác sĩ đang theo dõi bé thay vì áp cứng theo bài viết.",
        },
        { t: "h", text: "Trước và sau khi tiêm" },
        {
          t: "ul",
          items: [
            "Chỉ tiêm khi bé đang khoẻ. Đang tiêu chảy, sốt hay bỏ ăn thì nên hoãn lại.",
            "Nên tẩy giun trước mũi đầu tiên khoảng 1-2 tuần.",
            "Sau tiêm, giữ bé ở nhà và theo dõi 24-48 giờ. Mệt nhẹ, ngủ nhiều hơn là bình thường.",
            "Đi khám ngay nếu bé nôn nhiều, sưng mặt, khó thở hoặc lịm đi — dù hiếm, phản ứng dị ứng có xảy ra.",
            "Chưa tiêm đủ đợt thì chưa nên cho bé ra công viên hay tiếp xúc chó mèo lạ.",
          ],
        },
        { t: "h", text: "Giữ sổ tiêm phòng" },
        {
          t: "p",
          text: "Sổ tiêm là hồ sơ y tế của bé. Nó giúp bác sĩ biết đã tiêm gì, khi nào, loại vắc-xin nào — tránh tiêm trùng hoặc bỏ sót mũi. Sổ cũng cần khi bạn gửi bé đi trông, đi máy bay hoặc chuyển sang phòng khám khác.",
        },
        {
          t: "p",
          text: "Mọi bé tại MiewwL Pet House đều bàn giao kèm sổ tiêm phòng ghi rõ những mũi đã tiêm và ngày cần nhắc lại tiếp theo.",
        },
      ],
    },
    en: {
      title: "The puppy and kitten vaccination schedule to remember",
      excerpt:
        "Vaccinating on time is the single most important thing in your pet's first six months. Here are the basic milestones to track.",
      blocks: [
        {
          t: "p",
          text: "For the first few weeks a young animal still carries antibodies from its mother's milk, so it is relatively protected. But that protection fades, and the gap between the mother's antibodies wearing off and the vaccine taking effect is exactly when a puppy or kitten is most vulnerable. Vaccinating on schedule is about keeping that gap short.",
        },
        { t: "h", text: "The basic timeline" },
        {
          t: "ol",
          items: [
            "6-8 weeks old: the first combination vaccine.",
            "9-12 weeks old: the first booster.",
            "12-16 weeks old: the second booster, completing the primary course.",
            "From 12 weeks old: the rabies vaccine, usually given with or just after a booster.",
            "Every year: boosters as advised by your vet.",
          ],
        },
        {
          t: "note",
          text: "This is a common reference schedule. The exact dates depend on the vaccine used, your pet's health and your vet's advice — ask the vet who sees your pet rather than following an article to the letter.",
        },
        { t: "h", text: "Before and after the injection" },
        {
          t: "ul",
          items: [
            "Only vaccinate a healthy animal. Postpone if there is diarrhoea, fever or loss of appetite.",
            "Worm them roughly one to two weeks before the first dose.",
            "Afterwards, keep them home and watch for 24-48 hours. Mild tiredness and extra sleep are normal.",
            "Go to a vet immediately if there is repeated vomiting, facial swelling, laboured breathing or collapse — allergic reactions are rare but real.",
            "Until the course is complete, avoid parks and contact with unfamiliar dogs and cats.",
          ],
        },
        { t: "h", text: "Keep the vaccination record" },
        {
          t: "p",
          text: "The record book is your pet's medical history. It tells a vet what was given, when, and which vaccine — avoiding a double dose or a missed one. You will also need it for boarding, air travel, or moving to a different clinic.",
        },
        {
          t: "p",
          text: "Every pet from MiewwL Pet House is handed over with a vaccination record showing what has been given and when the next booster is due.",
        },
      ],
    },
  },

  {
    slug: "dau-hieu-can-dua-thu-cung-di-kham-ngay",
    image: "/blog/vet-check.jpg",
    category: "health",
    date: "2026-08-13",
    readMinutes: 7,
    vi: {
      title: "8 dấu hiệu cần đưa thú cưng đi khám ngay",
      excerpt:
        "Có những triệu chứng chờ được tới mai, và có những triệu chứng thì không. Đây là ranh giới bạn nên nhớ để không xử lý muộn.",
      blocks: [
        {
          t: "p",
          text: "Chó mèo không nói được chỗ đau, và bản năng của chúng là giấu bệnh. Vì vậy khi biểu hiện đã rõ ràng thì thường bệnh đã tiến triển được một thời gian. Dưới đây là những dấu hiệu không nên chờ đợi.",
        },
        { t: "h", text: "Đi khám ngay trong ngày" },
        {
          t: "ol",
          items: [
            "Khó thở, thở gấp, thở há miệng ở mèo, hoặc lưỡi/nướu tím tái.",
            "Nôn hoặc tiêu chảy liên tục nhiều lần trong vài giờ, đặc biệt nếu có máu.",
            "Bụng chướng cứng, kèm cố nôn mà không ra gì — dấu hiệu xoắn dạ dày ở chó lớn, rất nguy hiểm.",
            "Không đi tiểu được hoặc rặn tiểu liên tục mà không ra — hay gặp ở mèo đực, có thể tử vong trong 24-48 giờ.",
            "Co giật, mất thăng bằng, đi loạng choạng hoặc lịm đi.",
            "Chảy máu không cầm được, hoặc vết thương hở lớn.",
            "Nghi ăn phải chất độc: bả chuột, sô-cô-la, hành tỏi, thuốc của người, cây cảnh độc.",
            "Bỏ ăn hoàn toàn quá 24 giờ ở mèo — mèo nhịn ăn dài dễ dẫn tới bệnh gan nhiễm mỡ.",
          ],
        },
        {
          t: "note",
          text: "Hãy lưu sẵn số điện thoại và địa chỉ một phòng khám thú y trực đêm gần nhà. Lúc khẩn cấp không phải là lúc để bắt đầu tìm.",
        },
        { t: "h", text: "Nên đặt lịch khám trong vài ngày tới" },
        {
          t: "ul",
          items: [
            "Sụt cân rõ dù ăn uống bình thường.",
            "Uống nước và đi tiểu nhiều hơn hẳn — có thể liên quan tới thận hoặc tiểu đường.",
            "Hôi miệng nặng, chảy dãi, ngại nhai — thường là bệnh răng miệng.",
            "Ngứa gãi liên tục, rụng lông thành mảng, da đỏ hoặc có vảy.",
            "Đi khập khiễng kéo dài quá vài ngày.",
            "Ho khan dai dẳng, nhất là sau khi vận động.",
          ],
        },
        { t: "h", text: "Chuẩn bị gì khi đi khám" },
        {
          t: "p",
          text: "Bác sĩ chẩn đoán nhanh và chính xác hơn nhiều nếu bạn cung cấp đủ thông tin. Trước khi đi, hãy ghi lại:",
        },
        {
          t: "ul",
          items: [
            "Triệu chứng bắt đầu từ khi nào và diễn tiến ra sao.",
            "Bé ăn gì trong 24-48 giờ qua, có ăn gì lạ không.",
            "Loại thức ăn, thuốc hoặc thực phẩm bổ sung đang dùng.",
            "Sổ tiêm phòng và hồ sơ khám trước đó.",
            "Nếu tiêu chảy hoặc nôn, chụp ảnh lại — mô tả bằng lời thường không đủ.",
          ],
        },
      ],
    },
    en: {
      title: "8 signs your pet needs a vet right now",
      excerpt:
        "Some symptoms can wait until tomorrow and some cannot. Here is the line to keep in mind so you do not act too late.",
      blocks: [
        {
          t: "p",
          text: "Dogs and cats cannot tell you where it hurts, and instinct pushes them to hide illness. By the time the signs are obvious, the problem has usually been developing for a while. These are the ones not to wait on.",
        },
        { t: "h", text: "See a vet the same day" },
        {
          t: "ol",
          items: [
            "Laboured or rapid breathing, open-mouth breathing in a cat, or blue-tinged gums and tongue.",
            "Repeated vomiting or diarrhoea over a few hours, especially with blood.",
            "A hard, swollen belly with retching that brings nothing up — a sign of gastric torsion in large dogs, and an emergency.",
            "Unable to pass urine, or straining repeatedly with nothing coming out — common in male cats and fatal within 24-48 hours.",
            "Seizures, loss of balance, staggering or collapse.",
            "Bleeding that will not stop, or a large open wound.",
            "Suspected poisoning: rat bait, chocolate, onion and garlic, human medication, toxic houseplants.",
            "A cat that has eaten nothing at all for 24 hours — prolonged fasting can trigger fatty liver disease.",
          ],
        },
        {
          t: "note",
          text: "Save the number and address of an out-of-hours vet near you now. An emergency is not the moment to start searching.",
        },
        { t: "h", text: "Book an appointment within a few days" },
        {
          t: "ul",
          items: [
            "Clear weight loss despite eating normally.",
            "Drinking and urinating noticeably more — this can point to kidney disease or diabetes.",
            "Strong bad breath, drooling, reluctance to chew — usually dental disease.",
            "Constant scratching, patches of hair loss, red or flaky skin.",
            "Limping that lasts more than a few days.",
            "A persistent dry cough, particularly after exercise.",
          ],
        },
        { t: "h", text: "What to bring to the appointment" },
        {
          t: "p",
          text: "A vet reaches the right diagnosis far faster with good information. Before you go, note down:",
        },
        {
          t: "ul",
          items: [
            "When the symptoms started and how they have changed.",
            "What your pet has eaten in the last 24-48 hours, including anything unusual.",
            "The food, medication or supplements they are currently on.",
            "The vaccination record and any previous notes.",
            "If there is vomiting or diarrhoea, photograph it — a verbal description rarely covers it.",
          ],
        },
      ],
    },
  },

  {
    slug: "phong-say-nang-cho-thu-cung-mua-he",
    image: "/blog/dog-summer.jpg",
    category: "health",
    date: "2026-08-09",
    readMinutes: 6,
    vi: {
      title: "Phòng say nắng cho thú cưng trong mùa hè Việt Nam",
      excerpt:
        "Khí hậu nóng ẩm khiến sốc nhiệt là rủi ro có thật, nhất là với các giống lông dày và mũi ngắn. Cách phòng và cách xử lý khi đã xảy ra.",
      blocks: [
        {
          t: "p",
          text: "Chó mèo không toát mồ hôi qua da như người. Chó hạ nhiệt chủ yếu bằng cách thở hổn hển, mèo bằng cách liếm lông. Cả hai cách đều kém hiệu quả khi độ ẩm cao — đúng kiểu thời tiết mùa hè ở Việt Nam. Đó là lý do sốc nhiệt xảy ra nhanh hơn nhiều so với hình dung của phần lớn chủ nuôi.",
        },
        { t: "h", text: "Bé nào dễ bị nhất" },
        {
          t: "ul",
          items: [
            "Giống lông kép dày: Alaskan Malamute, Husky, Golden Retriever.",
            "Giống mũi ngắn: Shih Tzu, Pug, Bulldog, mèo Ba Tư — đường thở ngắn nên thở hổn hển kém hiệu quả.",
            "Bé thừa cân, bé lớn tuổi, bé có bệnh tim hoặc hô hấp.",
            "Chó con và mèo con dưới 4 tháng, khả năng điều nhiệt còn kém.",
          ],
        },
        { t: "h", text: "Phòng như thế nào" },
        {
          t: "ol",
          items: [
            "Luôn có nước sạch, mát, nhiều bát ở nhiều chỗ trong nhà.",
            "Dắt đi dạo vào sáng sớm hoặc sau khi mặt trời lặn, tránh khung 10h-16h.",
            "Sờ mặt đường bằng mu bàn tay trước khi dắt đi — nóng tay bạn thì bỏng chân bé.",
            "Chuẩn bị chỗ nằm mát: sàn gạch, phòng có quạt hoặc điều hoà, tránh nắng chiếu trực tiếp.",
            "Tuyệt đối không để bé một mình trong ô tô đóng kín, kể cả vài phút.",
            "Với giống lông dày, tỉa gọn lông mùa hè nhưng đừng cạo sát — lớp lông còn có tác dụng cách nhiệt và chống nắng.",
          ],
        },
        {
          t: "note",
          text: "Không bao giờ để bé nằm phơi nắng trong lồng vận chuyển bằng nhựa. Lồng kín hấp nhiệt rất nhanh và trở thành cái bẫy.",
        },
        { t: "h", text: "Nhận biết bé đang bị sốc nhiệt" },
        {
          t: "ul",
          items: [
            "Thở hổn hển dữ dội, lưỡi thè dài và đỏ sẫm.",
            "Chảy dãi nhiều, dãi đặc quánh.",
            "Đứng không vững, đi loạng choạng, mắt lờ đờ.",
            "Nôn hoặc tiêu chảy đột ngột.",
            "Nướu đỏ tươi bất thường hoặc tái nhợt.",
          ],
        },
        { t: "h", text: "Xử lý khẩn cấp" },
        {
          t: "ol",
          items: [
            "Đưa bé vào chỗ râm mát ngay lập tức.",
            "Làm mát bằng nước mát (KHÔNG dùng nước đá), dội vào bụng, nách, bẹn và bàn chân.",
            "Bật quạt thổi vào người bé khi đang ướt.",
            "Cho uống từng ít nước mát nếu bé còn tỉnh táo; không ép uống nếu bé lơ mơ.",
            "Gọi và tới phòng khám thú y ngay, kể cả khi bé có vẻ đã đỡ.",
          ],
        },
        {
          t: "p",
          text: "Sốc nhiệt có thể gây tổn thương nội tạng xuất hiện muộn vài giờ sau khi bé trông đã bình thường. Đây luôn là trường hợp cần bác sĩ khám, không phải chuyện tự xử lý xong là xong.",
        },
      ],
    },
    en: {
      title: "Preventing heatstroke in a Vietnamese summer",
      excerpt:
        "A hot, humid climate makes heatstroke a genuine risk, especially for thick-coated and flat-faced breeds. How to prevent it, and what to do if it happens.",
      blocks: [
        {
          t: "p",
          text: "Dogs and cats do not sweat through the skin the way people do. Dogs cool themselves mainly by panting, cats by licking their coat. Both work poorly when humidity is high — which is exactly the Vietnamese summer. That is why heatstroke comes on far faster than most owners expect.",
        },
        { t: "h", text: "Who is most at risk" },
        {
          t: "ul",
          items: [
            "Thick double-coated breeds: Alaskan Malamute, Husky, Golden Retriever.",
            "Flat-faced breeds: Shih Tzu, Pug, Bulldog, Persian cats — a short airway makes panting much less effective.",
            "Overweight pets, older pets, and any with heart or respiratory disease.",
            "Puppies and kittens under four months, whose temperature control is still poor.",
          ],
        },
        { t: "h", text: "How to prevent it" },
        {
          t: "ol",
          items: [
            "Always have clean, cool water available, in several bowls around the house.",
            "Walk early in the morning or after sunset, avoiding roughly 10am to 4pm.",
            "Test the pavement with the back of your hand first — if it is hot for you, it burns their paws.",
            "Prepare a cool spot: tiled floor, a room with a fan or air conditioning, out of direct sun.",
            "Never leave a pet alone in a closed car, not even for a few minutes.",
            "For thick-coated breeds, trim the coat in summer but do not shave it down — the coat also insulates and shields from the sun.",
          ],
        },
        {
          t: "note",
          text: "Never leave a pet sitting in the sun inside a plastic carrier. A closed carrier heats up extremely fast and becomes a trap.",
        },
        { t: "h", text: "Recognising heatstroke" },
        {
          t: "ul",
          items: [
            "Heavy, frantic panting with the tongue hanging long and dark red.",
            "Heavy drooling, with thick, ropey saliva.",
            "Unsteadiness, staggering, a glazed look.",
            "Sudden vomiting or diarrhoea.",
            "Gums that are unusually bright red, or pale.",
          ],
        },
        { t: "h", text: "Emergency response" },
        {
          t: "ol",
          items: [
            "Move them into shade immediately.",
            "Cool them with cool water (NOT ice water), over the belly, armpits, groin and paws.",
            "Point a fan at them while they are wet.",
            "Offer small amounts of cool water if they are alert; do not force it if they are dazed.",
            "Call and get to a vet straight away, even if they seem to have recovered.",
          ],
        },
        {
          t: "p",
          text: "Heatstroke can cause organ damage that only shows up hours after your pet looks normal again. This always needs a vet — it is not something you deal with at home and then forget.",
        },
      ],
    },
  },

  {
    slug: "5-sai-lam-pho-bien-khi-cho-meo-an",
    image: "/blog/cat-eating.jpg",
    category: "nutrition",
    date: "2026-08-14",
    readMinutes: 6,
    vi: {
      title: "5 sai lầm phổ biến khi cho mèo ăn",
      excerpt:
        "Cho ăn quá nhiều, đổi thức ăn đột ngột hay quên nước sạch là những lỗi thường gặp khiến mèo dễ bị rối loạn tiêu hoá.",
      blocks: [
        {
          t: "p",
          text: "Phần lớn vấn đề tiêu hoá và cân nặng ở mèo nhà không đến từ thức ăn kém chất lượng, mà từ cách cho ăn. Năm lỗi dưới đây gặp ở hầu hết gia đình mới nuôi.",
        },
        { t: "h", text: "1. Để thức ăn sẵn cả ngày" },
        {
          t: "p",
          text: "Đổ đầy bát rồi để đó là cách nhanh nhất khiến mèo thừa cân, vì bạn không còn kiểm soát được bé ăn bao nhiêu — và cũng không biết bé bỏ ăn từ lúc nào, trong khi bỏ ăn là dấu hiệu bệnh quan trọng nhất ở mèo. Hãy chia 2-3 bữa cố định giờ và cất bát sau 20-30 phút.",
        },
        { t: "h", text: "2. Đổi loại hạt đột ngột" },
        {
          t: "p",
          text: "Hệ vi sinh đường ruột cần thời gian thích nghi. Đổi thẳng sang loại mới thường gây tiêu chảy trong 1-2 ngày. Cách đúng là trộn dần trong 5-7 ngày: 25% mới trong 2 ngày đầu, 50% hai ngày tiếp, 75% rồi mới hoàn toàn.",
        },
        { t: "h", text: "3. Coi nhẹ chuyện nước uống" },
        {
          t: "p",
          text: "Mèo vốn có bản năng uống ít nước, tổ tiên chúng lấy nước chủ yếu từ con mồi. Mèo ăn hạt khô mà uống không đủ rất dễ gặp vấn đề tiết niệu — bệnh phổ biến và nguy hiểm nhất ở mèo đực.",
        },
        {
          t: "ul",
          items: [
            "Đặt nhiều bát nước ở nhiều phòng, thay nước mỗi ngày.",
            "Để bát nước xa bát ăn và xa khay cát — mèo bản năng tránh uống nước gần chỗ ăn và chỗ vệ sinh.",
            "Cân nhắc đài phun nước cho mèo: nước chảy kích thích bé uống nhiều hơn.",
            "Bổ sung pate hoặc thức ăn ướt để tăng lượng nước nạp vào.",
          ],
        },
        { t: "h", text: "4. Cho ăn thức ăn của người" },
        {
          t: "p",
          text: "Nhiều món quen thuộc với chúng ta lại độc với mèo. Hành, tỏi, sô-cô-la, nho và nho khô, xylitol trong kẹo cao su không đường, rượu bia — đều cần tránh tuyệt đối. Thức ăn mặn hằng ngày của người cũng thừa muối và dầu mỡ so với nhu cầu của mèo.",
        },
        { t: "h", text: "5. Không cân đo khẩu phần" },
        {
          t: "p",
          text: "Ước lượng bằng mắt gần như luôn cho ra nhiều hơn nhu cầu thật. Hãy đọc bảng khẩu phần trên bao bì theo cân nặng của bé, dùng cốc đong hoặc cân bếp, và điều chỉnh sau mỗi lần cân bé định kỳ.",
        },
        {
          t: "note",
          text: "Mèo thừa cân dễ mắc tiểu đường, viêm khớp và bệnh gan. Sờ được xương sườn dưới lớp mỡ mỏng và nhìn ngang thấy eo là dáng chuẩn.",
        },
      ],
    },
    en: {
      title: "5 common mistakes when feeding a cat",
      excerpt:
        "Overfeeding, switching food abruptly and forgetting fresh water are the usual culprits behind an upset stomach.",
      blocks: [
        {
          t: "p",
          text: "Most digestive and weight problems in house cats come not from poor food but from how it is served. These five mistakes turn up in almost every household new to cats.",
        },
        { t: "h", text: "1. Leaving food out all day" },
        {
          t: "p",
          text: "Filling the bowl and walking away is the quickest route to an overweight cat, because you lose track of how much they eat — and of when they stop eating, which is the single most important warning sign in cats. Feed two or three meals at set times and take the bowl away after 20-30 minutes.",
        },
        { t: "h", text: "2. Switching kibble suddenly" },
        {
          t: "p",
          text: "Gut bacteria need time to adapt. Going straight onto a new food usually causes a day or two of diarrhoea. Mix it in over 5-7 days instead: 25% new for two days, 50% for two more, then 75%, then all of it.",
        },
        { t: "h", text: "3. Treating water as an afterthought" },
        {
          t: "p",
          text: "Cats instinctively drink little; their ancestors got most of their water from prey. A cat on dry food that does not drink enough is prone to urinary problems — the most common and most dangerous condition in male cats.",
        },
        {
          t: "ul",
          items: [
            "Put several water bowls in different rooms and change them daily.",
            "Keep water away from the food bowl and well away from the litter tray — cats instinctively avoid drinking near food or toilet.",
            "Consider a cat fountain: running water encourages them to drink more.",
            "Add wet food or pâté to increase their water intake.",
          ],
        },
        { t: "h", text: "4. Feeding human food" },
        {
          t: "p",
          text: "Plenty of everyday foods are toxic to cats. Onion and garlic, chocolate, grapes and raisins, xylitol in sugar-free gum, and alcohol must all be avoided completely. Ordinary savoury human meals are also far too salty and oily for a cat's needs.",
        },
        { t: "h", text: "5. Not measuring portions" },
        {
          t: "p",
          text: "Judging by eye almost always overshoots. Read the feeding chart on the bag for your cat's weight, use a measuring cup or kitchen scale, and adjust after each regular weigh-in.",
        },
        {
          t: "note",
          text: "Overweight cats are prone to diabetes, arthritis and liver disease. You should be able to feel the ribs under a thin layer of fat, and see a waist from above.",
        },
      ],
    },
  },

  {
    slug: "chon-thuc-an-theo-do-tuoi",
    image: "/supplies/hat-royal-canin-meo-truong-thanh-2kg-1.jpg",
    category: "nutrition",
    date: "2026-08-11",
    readMinutes: 6,
    vi: {
      title: "Chọn thức ăn cho chó mèo theo từng độ tuổi",
      excerpt:
        "Bé con, bé trưởng thành và bé lớn tuổi có nhu cầu dinh dưỡng khác hẳn nhau. Đây là cách chọn đúng loại theo từng giai đoạn.",
      blocks: [
        {
          t: "p",
          text: "Nhãn \"puppy\", \"adult\", \"senior\" trên bao bì không phải chiêu bán hàng. Nhu cầu đạm, canxi, năng lượng và cả kích cỡ viên hạt thay đổi rất nhiều theo từng giai đoạn sống.",
        },
        { t: "h", text: "Giai đoạn con non (0-12 tháng)" },
        {
          t: "ul",
          items: [
            "Cần nhiều đạm và năng lượng hơn hẳn bé trưởng thành để phát triển cơ và xương.",
            "Viên hạt nhỏ, dễ nhai; có thể ngâm mềm với nước ấm cho bé dưới 3 tháng.",
            "Chia nhiều bữa nhỏ: 3-4 bữa/ngày dưới 6 tháng, giảm còn 2-3 bữa sau đó.",
            "Với chó giống lớn, dùng loại dành riêng cho giống lớn — hàm lượng canxi được kiểm soát để xương khớp phát triển đúng nhịp.",
          ],
        },
        {
          t: "note",
          text: "Đừng cho chó giống lớn ăn thức ăn siêu giàu năng lượng để \"lớn nhanh\". Lớn quá nhanh làm tăng nguy cơ loạn sản khớp háng khi trưởng thành.",
        },
        { t: "h", text: "Giai đoạn trưởng thành (1-7 tuổi)" },
        {
          t: "ul",
          items: [
            "Chuyển sang loại adult khi bé đạt khoảng 80-90% cân nặng trưởng thành.",
            "Giữ khẩu phần theo bảng hướng dẫn và cân bé mỗi 1-2 tháng.",
            "Bé đã triệt sản cần ít năng lượng hơn khoảng 20-30% — có dòng riêng cho nhóm này.",
            "Với mèo trong nhà ít vận động, chọn loại kiểm soát búi lông và cân nặng.",
          ],
        },
        { t: "h", text: "Giai đoạn lớn tuổi (từ 7 tuổi trở lên)" },
        {
          t: "ul",
          items: [
            "Ít năng lượng hơn nhưng đạm vẫn phải đủ chất lượng để giữ khối cơ.",
            "Bổ sung glucosamine và chondroitin hỗ trợ khớp.",
            "Viên hạt mềm hơn nếu bé bắt đầu có vấn đề răng miệng.",
            "Nên khám sức khoẻ định kỳ 6 tháng/lần và điều chỉnh thức ăn theo kết quả xét nghiệm.",
          ],
        },
        { t: "h", text: "Đọc bảng thành phần thế nào" },
        {
          t: "p",
          text: "Thành phần được liệt kê theo thứ tự khối lượng giảm dần. Nếu ba thành phần đầu tiên là nguồn đạm động vật cụ thể (thịt gà, cá hồi, thịt cừu) thì đó là dấu hiệu tốt. Ngược lại, nếu đứng đầu là ngô hoặc phụ phẩm chung chung không nêu rõ loài, hãy cân nhắc lựa chọn khác.",
        },
      ],
    },
    en: {
      title: "Choosing food by life stage",
      excerpt:
        "Puppies and kittens, adults, and senior pets have very different nutritional needs. Here is how to pick the right food for each stage.",
      blocks: [
        {
          t: "p",
          text: 'The "puppy", "adult" and "senior" labels are not a marketing trick. Protein, calcium, energy needs and even kibble size change substantially across a pet\'s life.',
        },
        { t: "h", text: "Young: 0-12 months" },
        {
          t: "ul",
          items: [
            "Needs noticeably more protein and energy than an adult, to build muscle and bone.",
            "Small, easy-to-chew kibble; soak it in warm water for animals under three months.",
            "Split into several small meals: 3-4 a day under six months, dropping to 2-3 after that.",
            "For large-breed puppies use a large-breed formula — the calcium is controlled so the skeleton develops at the right pace.",
          ],
        },
        {
          t: "note",
          text: 'Do not feed a large-breed puppy an extra-rich food to "grow it faster". Growing too fast raises the risk of hip dysplasia in adulthood.',
        },
        { t: "h", text: "Adult: 1-7 years" },
        {
          t: "ul",
          items: [
            "Switch to an adult formula once they reach roughly 80-90% of adult weight.",
            "Stick to the feeding chart and weigh them every one to two months.",
            "A neutered pet needs around 20-30% less energy — there are formulas made for this.",
            "For less active indoor cats, choose a hairball and weight control formula.",
          ],
        },
        { t: "h", text: "Senior: 7 years and older" },
        {
          t: "ul",
          items: [
            "Less energy, but protein quality still needs to be good to preserve muscle.",
            "Added glucosamine and chondroitin to support the joints.",
            "Softer kibble if dental problems are starting.",
            "Health checks every six months, adjusting the diet based on the test results.",
          ],
        },
        { t: "h", text: "How to read the ingredient list" },
        {
          t: "p",
          text: "Ingredients are listed by weight, heaviest first. If the first three are named animal protein sources — chicken, salmon, lamb — that is a good sign. If the list opens with corn or a vague by-product that does not name the species, consider something else.",
        },
      ],
    },
  },

  {
    slug: "doi-thuc-an-dung-cach",
    image: "/supplies/hat-cho-cho-truong-thanh-ga-rau-cu-3kg-1.jpg",
    category: "nutrition",
    date: "2026-08-07",
    readMinutes: 4,
    vi: {
      title: "Đổi thức ăn đúng cách để bé không bị tiêu chảy",
      excerpt:
        "Đổi hạt là việc ai cũng phải làm ít nhất vài lần. Làm đúng thì bé không sao, làm sai thì mất cả tuần dọn dẹp.",
      blocks: [
        {
          t: "p",
          text: "Đường ruột chó mèo có hệ vi sinh riêng, đã quen với thành phần của loại thức ăn hiện tại. Thay đổi đột ngột khiến hệ vi sinh này mất cân bằng, dẫn tới phân lỏng, đầy hơi, thậm chí nôn.",
        },
        { t: "h", text: "Lịch chuyển đổi 7 ngày" },
        {
          t: "ol",
          items: [
            "Ngày 1-2: 75% thức ăn cũ, 25% thức ăn mới.",
            "Ngày 3-4: 50% cũ, 50% mới.",
            "Ngày 5-6: 25% cũ, 75% mới.",
            "Ngày 7 trở đi: 100% thức ăn mới.",
          ],
        },
        {
          t: "note",
          text: "Với bé bụng yếu, bé con hoặc bé vừa ốm dậy, hãy kéo dài lịch này thành 10-14 ngày thay vì 7.",
        },
        { t: "h", text: "Theo dõi gì trong quá trình đổi" },
        {
          t: "ul",
          items: [
            "Phân: nên giữ khuôn. Nếu lỏng, quay lại tỉ lệ của bước trước và giữ thêm 2 ngày.",
            "Khẩu vị: bé bỏ ăn hoàn toàn thì có thể không hợp mùi, cần cân nhắc loại khác.",
            "Da và lông: dị ứng thức ăn thường biểu hiện muộn sau 2-4 tuần, dưới dạng ngứa và đỏ da.",
            "Cân nặng: cân lại sau 3-4 tuần và điều chỉnh khẩu phần theo bảng của loại mới.",
          ],
        },
        { t: "h", text: "Khi nào nên dừng lại" },
        {
          t: "p",
          text: "Nếu bé tiêu chảy kéo dài quá 48 giờ, có máu trong phân, nôn nhiều lần hoặc bỏ ăn hoàn toàn, hãy dừng đổi và đưa bé đi khám. Đừng cố tiếp tục lịch chuyển đổi khi bé đang có triệu chứng.",
        },
      ],
    },
    en: {
      title: "How to switch food without causing diarrhoea",
      excerpt:
        "Everyone changes their pet's food at some point. Done right it passes unnoticed; done wrong it means a week of cleaning up.",
      blocks: [
        {
          t: "p",
          text: "A dog or cat's gut carries its own bacterial community, tuned to the food they currently eat. Change it abruptly and that community is thrown off balance, which means loose stools, gas, sometimes vomiting.",
        },
        { t: "h", text: "The seven-day transition" },
        {
          t: "ol",
          items: [
            "Days 1-2: 75% old food, 25% new.",
            "Days 3-4: 50% old, 50% new.",
            "Days 5-6: 25% old, 75% new.",
            "Day 7 onwards: 100% new food.",
          ],
        },
        {
          t: "note",
          text: "For a sensitive stomach, a young animal, or one recovering from illness, stretch this to 10-14 days rather than 7.",
        },
        { t: "h", text: "What to watch during the change" },
        {
          t: "ul",
          items: [
            "Stools: they should stay formed. If they loosen, go back to the previous ratio and hold it two more days.",
            "Appetite: refusing the food entirely may mean they dislike the smell, and another product is worth trying.",
            "Skin and coat: food allergies often show up late, after 2-4 weeks, as itching and redness.",
            "Weight: reweigh after 3-4 weeks and adjust the portion to the new food's chart.",
          ],
        },
        { t: "h", text: "When to stop" },
        {
          t: "p",
          text: "If diarrhoea lasts more than 48 hours, there is blood in the stool, there is repeated vomiting, or your pet refuses food entirely, stop the transition and see a vet. Do not push on with the schedule while symptoms are present.",
        },
      ],
    },
  },
];
