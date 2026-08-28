import { BlogPost } from "./types";

/** Cẩm nang: Chăm sóc & Huấn luyện. Nội dung do cửa hàng tự biên soạn. */
export const CARE_POSTS: BlogPost[] = [
  {
    slug: "huong-dan-chai-long-tai-nha",
    image: "/blog/grooming.jpg",
    category: "care",
    date: "2026-08-18",
    readMinutes: 7,
    vi: {
      title: "Hướng dẫn chải lông và cắt tỉa tại nhà",
      excerpt:
        "Không phải lần nào cũng cần ra tiệm. Chải đúng cách mỗi tuần giúp bé sạch, đỡ rụng lông và phát hiện sớm vấn đề da.",
      blocks: [
        {
          t: "p",
          text: "Chải lông không chỉ để đẹp. Nó gỡ lông chết trước khi kết thành búi, phân bố dầu tự nhiên khắp bộ lông, và quan trọng nhất là cho bạn cơ hội sờ khắp người bé mỗi tuần — đó là cách phát hiện sớm u cục, ve rận hay vết thương mà nhìn bằng mắt sẽ bỏ sót.",
        },
        { t: "h", text: "Chọn đúng dụng cụ" },
        {
          t: "ul",
          items: [
            "Lược chải thưa (slicker brush): dùng cho lông dài, gỡ rối tốt.",
            "Lược răng thưa kim loại: kiểm tra lại sau khi chải, chỗ nào lược không đi qua được là chỗ còn rối.",
            "Găng chải lông: hợp với lông ngắn và với bé sợ lược.",
            "Kéo đầu tròn: chỉ dùng để tỉa gọn quanh mắt, bàn chân, hậu môn.",
            "Tông đơ nhỏ: nếu bạn tự cắt, hãy dùng tông đơ chuyên dụng cho thú cưng, không dùng tông đơ người.",
          ],
        },
        { t: "h", text: "Tần suất theo loại lông" },
        {
          t: "ul",
          items: [
            "Lông ngắn dày (British Shorthair, Beagle): 1-2 lần/tuần.",
            "Lông dài (Ba Tư, Ragdoll, Maine Coon): mỗi ngày, không bỏ ngày nào.",
            "Lông xoăn không rụng (Poodle): 2-3 lần/tuần và cắt tỉa mỗi 4-6 tuần.",
            "Lông kép dày (Alaskan Malamute, Golden): 3-4 lần/tuần, tăng lên hằng ngày trong mùa thay lông.",
          ],
        },
        { t: "h", text: "Trình tự chải đúng" },
        {
          t: "ol",
          items: [
            "Bắt đầu khi bé đang thư giãn, không phải lúc vừa chơi xong hay đang đói.",
            "Chải theo chiều lông mọc, từ đầu xuống đuôi, từng vùng nhỏ một.",
            "Gặp chỗ rối, giữ gốc lông bằng tay rồi gỡ dần từ ngoài vào — kéo thẳng sẽ làm bé đau và sợ chải từ lần sau.",
            "Ưu tiên các vùng dễ rối: sau tai, nách, bẹn, quanh cổ, gốc đuôi.",
            "Kết thúc bằng lược răng thưa để kiểm tra và bằng một phần thưởng nhỏ.",
          ],
        },
        {
          t: "note",
          text: "Búi lông đã bết sát da thì đừng tự cắt bằng kéo — da bên dưới bị kéo lên rất dễ cắt trúng. Trường hợp này nên để tiệm dùng tông đơ xử lý.",
        },
        { t: "h", text: "Cắt móng và vệ sinh tai" },
        {
          t: "p",
          text: "Cắt móng mỗi 3-4 tuần, chỉ cắt phần trong suốt ở đầu móng và tránh phần hồng có mạch máu. Móng sẫm màu khó nhìn thì cắt từng chút một. Tai chỉ cần lau vành ngoài bằng dung dịch chuyên dụng — không đưa tăm bông vào sâu.",
        },
        { t: "h", text: "Khi nào nên ra tiệm" },
        {
          t: "p",
          text: "Cắt tỉa tạo kiểu, xử lý lông bết nặng, tắm cho giống lông kép dày, hoặc khi bé phản ứng dữ dội với việc chải ở nhà — đó là lúc nên để người có nghề làm. Dịch vụ spa tại MiewwL Pet House nhận cả những trường hợp bé khó tính, và bạn có thể ước tính giá trước ngay trên trang Spa.",
        },
      ],
    },
    en: {
      title: "Brushing and trimming at home",
      excerpt:
        "You do not need a salon every time. Brushing properly each week keeps your pet clean, cuts shedding and catches skin problems early.",
      blocks: [
        {
          t: "p",
          text: "Grooming is not just about looks. It lifts out dead hair before it mats, spreads the natural oils through the coat, and — most importantly — gives you a reason to run your hands over your pet every week. That is how lumps, ticks and small wounds get found early, when looking alone would miss them.",
        },
        { t: "h", text: "Picking the right tools" },
        {
          t: "ul",
          items: [
            "Slicker brush: for long coats, good at working through tangles.",
            "Metal comb: use it after brushing — anywhere the comb snags is somewhere still matted.",
            "Grooming glove: suits short coats and pets that are afraid of a brush.",
            "Round-tipped scissors: only for tidying around the eyes, paws and rear.",
            "Small clippers: if you trim at home, use clippers made for pets, never human ones.",
          ],
        },
        { t: "h", text: "How often, by coat type" },
        {
          t: "ul",
          items: [
            "Short dense coats (British Shorthair, Beagle): once or twice a week.",
            "Long coats (Persian, Ragdoll, Maine Coon): every day, without skipping.",
            "Curly non-shedding coats (Poodle): 2-3 times a week plus a trim every 4-6 weeks.",
            "Thick double coats (Alaskan Malamute, Golden Retriever): 3-4 times a week, daily during moulting season.",
          ],
        },
        { t: "h", text: "The right order" },
        {
          t: "ol",
          items: [
            "Start when your pet is relaxed — not straight after play, and not when they are hungry.",
            "Brush with the direction of growth, head to tail, one small section at a time.",
            "At a tangle, hold the hair at the root and work it loose from the outside in — pulling straight through hurts, and they will resist the brush next time.",
            "Pay attention to the spots that mat first: behind the ears, armpits, groin, around the neck, base of the tail.",
            "Finish with the metal comb to check your work, and with a small treat.",
          ],
        },
        {
          t: "note",
          text: "Never cut a mat that is flat against the skin with scissors — the skin lifts with it and is very easy to cut. Let a salon deal with those using clippers.",
        },
        { t: "h", text: "Nails and ears" },
        {
          t: "p",
          text: "Trim nails every 3-4 weeks, taking only the clear tip and avoiding the pink quick. On dark nails, take a little at a time. For ears, wipe only the outer flap with a proper ear cleaner — never push a cotton bud down the canal.",
        },
        { t: "h", text: "When to book a salon" },
        {
          t: "p",
          text: "Style trims, heavy matting, bathing a thick double coat, or a pet that reacts badly to brushing at home — those are the moments for a professional. The spa at MiewwL Pet House takes difficult cases too, and you can estimate the price up front on the Spa page.",
        },
      ],
    },
  },

  {
    slug: "cham-soc-meo-long-dai-khong-bi-roi",
    image: "/breeds/persian-1.jpg",
    category: "care",
    date: "2026-08-12",
    readMinutes: 6,
    vi: {
      title: "Chăm sóc mèo lông dài không bị rối",
      excerpt:
        "Ba Tư, Ragdoll và Maine Coon đẹp nhất khi bộ lông được giữ tơi. Đây là thói quen hằng ngày để không bao giờ phải cạo lông bé.",
      blocks: [
        {
          t: "p",
          text: "Lông dài không tự rối trong một ngày. Nó bết dần từ những nút nhỏ ở chỗ ma sát nhiều, và tới lúc bạn nhìn thấy thì thường đã sát da. Bí quyết duy nhất là đều đặn, chứ không phải kỹ thuật cao siêu.",
        },
        { t: "h", text: "Năm phút mỗi ngày, không phải một tiếng mỗi tuần" },
        {
          t: "p",
          text: "Chải 5 phút mỗi ngày hiệu quả hơn nhiều so với một buổi chải kỹ cuối tuần, và bé cũng dễ chấp nhận hơn. Hãy gắn nó vào một thói quen sẵn có — ví dụ ngay trước bữa tối — để không quên.",
        },
        { t: "h", text: "Những chỗ luôn rối trước tiên" },
        {
          t: "ul",
          items: [
            "Sau tai và hai bên má, nơi bé hay dụi.",
            "Nách và bẹn, ma sát liên tục khi đi lại.",
            "Yếm cổ và ngực, đặc biệt ở Maine Coon.",
            "Quần đùi sau và gốc đuôi.",
            "Vùng quanh hậu môn — nên tỉa gọn để giữ vệ sinh.",
          ],
        },
        {
          t: "note",
          text: "Với mèo Ba Tư mũi tịt, hãy lau vùng quanh mắt mỗi ngày bằng khăn ẩm mềm. Nước mắt chảy đọng lại làm lông bết và gây viêm da vùng nếp gấp.",
        },
        { t: "h", text: "Búi lông trong dạ dày" },
        {
          t: "p",
          text: "Mèo lông dài nuốt nhiều lông hơn khi tự liếm. Phần lớn được nôn ra hoặc đi qua đường tiêu hoá, nhưng búi lớn có thể gây tắc. Chải đều là biện pháp phòng tốt nhất, kết hợp với:",
        },
        {
          t: "ul",
          items: [
            "Thức ăn có công thức kiểm soát búi lông (hairball control).",
            "Đủ nước — pate hoặc thức ăn ướt giúp nhiều.",
            "Gel trợ tiêu búi lông theo hướng dẫn của bác sĩ, không lạm dụng.",
          ],
        },
        {
          t: "p",
          text: "Nếu bé cố nôn nhiều lần mà không ra gì, bỏ ăn, hoặc táo bón kéo dài, đừng chờ — đó có thể là tắc ruột và cần khám ngay.",
        },
        { t: "h", text: "Tắm cho mèo lông dài" },
        {
          t: "ol",
          items: [
            "Chải hết rối TRƯỚC khi tắm. Lông rối gặp nước sẽ thắt chặt lại và gần như không gỡ được.",
            "Dùng sữa tắm dành riêng cho mèo, nước ấm vừa phải.",
            "Xả thật kỹ — cặn sữa tắm còn sót gây ngứa và bết lông.",
            "Sấy khô hoàn toàn ở nhiệt độ thấp; để lông ẩm tự khô là nguyên nhân phổ biến gây nấm da.",
          ],
        },
      ],
    },
    en: {
      title: "Keeping a long-haired cat free of mats",
      excerpt:
        "Persians, Ragdolls and Maine Coons look their best with the coat kept open. Here is the daily habit that means never having to shave your cat.",
      blocks: [
        {
          t: "p",
          text: "A long coat does not mat overnight. It tightens gradually from small knots where there is friction, and by the time you can see it, it is usually against the skin. The only real trick is consistency, not technique.",
        },
        { t: "h", text: "Five minutes a day beats an hour a week" },
        {
          t: "p",
          text: "Five minutes daily works far better than one thorough weekend session, and your cat tolerates it much more easily. Attach it to something you already do — right before dinner, say — so it does not get forgotten.",
        },
        { t: "h", text: "Where mats always start" },
        {
          t: "ul",
          items: [
            "Behind the ears and along the cheeks, where they rub.",
            "Armpits and groin, under constant friction as they move.",
            "The ruff and chest, especially on a Maine Coon.",
            "The back trousers and the base of the tail.",
            "Around the rear — worth trimming short for hygiene.",
          ],
        },
        {
          t: "note",
          text: "For a flat-faced Persian, wipe around the eyes daily with a soft damp cloth. Tears that sit in the fold mat the fur and cause skin inflammation.",
        },
        { t: "h", text: "Hairballs" },
        {
          t: "p",
          text: "Long-haired cats swallow more hair when they groom themselves. Most of it comes back up or passes through, but a large ball can cause a blockage. Regular brushing is the best prevention, along with:",
        },
        {
          t: "ul",
          items: [
            "A hairball control formula food.",
            "Enough water — wet food or pâté helps a lot.",
            "A hairball paste as directed by your vet, not used routinely without advice.",
          ],
        },
        {
          t: "p",
          text: "If your cat retches repeatedly with nothing coming up, stops eating, or is constipated for days, do not wait — that can be an obstruction and needs a vet.",
        },
        { t: "h", text: "Bathing a long-haired cat" },
        {
          t: "ol",
          items: [
            "Brush out every tangle BEFORE the bath. Mats tighten in water and become almost impossible to open.",
            "Use a shampoo made for cats, with comfortably warm water.",
            "Rinse thoroughly — leftover shampoo causes itching and a greasy coat.",
            "Dry completely on a low heat setting; leaving the coat damp is a common cause of ringworm.",
          ],
        },
      ],
    },
  },

  {
    slug: "thu-cung-va-tre-nho-xay-dung-tinh-ban-an-toan",
    image: "/blog/child-and-dog.jpg",
    category: "care",
    date: "2026-08-08",
    readMinutes: 6,
    vi: {
      title: "Thú cưng và trẻ nhỏ: Xây dựng tình bạn an toàn",
      excerpt:
        "Trẻ em và thú cưng có thể trở thành đôi bạn thân nếu được hướng dẫn đúng cách ngay từ đầu. Vài nguyên tắc cha mẹ nên biết.",
      blocks: [
        {
          t: "p",
          text: "Hầu hết sự cố giữa trẻ nhỏ và thú cưng không đến từ một con vật hung dữ, mà từ một con vật đã báo hiệu khó chịu nhiều lần nhưng không ai đọc được tín hiệu. Dạy trẻ đọc tín hiệu ấy quan trọng ngang với dạy bé thú cưng nghe lời.",
        },
        { t: "h", text: "Tín hiệu bé đang muốn được yên" },
        {
          t: "ul",
          items: [
            "Chó: liếm mép, ngáp khi không buồn ngủ, quay đầu đi, lộ lòng trắng mắt, cụp tai, cứng người.",
            "Mèo: đuôi quật mạnh, tai ép ra sau, giãn đồng tử, da lưng giật, ngừng kêu grừ đột ngột.",
            "Cả hai: bỏ đi chỗ khác — đây là lời từ chối rõ ràng nhất và phải được tôn trọng.",
          ],
        },
        {
          t: "note",
          text: "Gầm gừ là lời cảnh báo, không phải hành vi xấu cần phạt. Phạt bé vì gầm gừ chỉ dạy bé bỏ qua bước cảnh báo và cắn thẳng ở lần sau.",
        },
        { t: "h", text: "Nguyên tắc cho trẻ" },
        {
          t: "ol",
          items: [
            "Vuốt nhẹ theo chiều lông ở lưng và vai; không chạm mặt, tai, bụng, đuôi và bàn chân.",
            "Không ôm siết, không cưỡi lên lưng, không kéo đuôi.",
            "Không lại gần khi bé đang ăn, đang gặm xương hoặc đang ngủ.",
            "Không đuổi theo khi bé bỏ đi.",
            "Muốn chơi thì gọi bé lại, để bé chủ động đến.",
          ],
        },
        { t: "h", text: "Nguyên tắc cho cha mẹ" },
        {
          t: "ul",
          items: [
            "Luôn giám sát trẻ dưới 6 tuổi khi ở cùng thú cưng, nhất là trong vài tuần đầu làm quen.",
            "Cho bé thú cưng một chỗ trú riêng mà trẻ không được vào — chuồng, ổ hoặc một căn phòng.",
            "Đặt bát ăn ở nơi trẻ không lui tới trong giờ ăn.",
            "Cho trẻ tham gia cho ăn và chải lông dưới hướng dẫn — điều này xây dựng sự gắn kết và trách nhiệm.",
            "Dạy trẻ rửa tay sau khi chơi với bé.",
          ],
        },
        { t: "h", text: "Chọn giống phù hợp nhà có trẻ nhỏ" },
        {
          t: "p",
          text: "Tính cách cá thể quan trọng hơn giống, nhưng có những giống nổi tiếng kiên nhẫn với trẻ: Golden Retriever, Beagle, Corgi ở nhóm chó; British Shorthair và Ragdoll ở nhóm mèo. Mỗi trang chi tiết giống trên MiewwL Pet House đều có chỉ số \"Hợp trẻ nhỏ\" để bạn so sánh nhanh.",
        },
      ],
    },
    en: {
      title: "Pets and small children: building a safe friendship",
      excerpt:
        "Children and pets can become the best of friends when it is handled well from the start. A few ground rules for parents.",
      blocks: [
        {
          t: "p",
          text: "Most incidents between children and pets do not involve an aggressive animal. They involve an animal that signalled discomfort several times without anyone reading the signals. Teaching a child to read them matters as much as training the pet.",
        },
        { t: "h", text: "Signals that mean 'leave me alone'" },
        {
          t: "ul",
          items: [
            "Dogs: lip licking, yawning when not tired, turning the head away, whites of the eyes showing, ears back, body going stiff.",
            "Cats: tail thumping, ears flattened back, dilated pupils, skin twitching along the back, purring that stops abruptly.",
            "Both: walking away — the clearest refusal there is, and one that must be respected.",
          ],
        },
        {
          t: "note",
          text: "A growl is a warning, not bad behaviour to be punished. Punishing a growl teaches a dog to skip the warning and go straight to biting next time.",
        },
        { t: "h", text: "Rules for the child" },
        {
          t: "ol",
          items: [
            "Stroke gently along the back and shoulders with the fur; no face, ears, belly, tail or paws.",
            "No squeezing, no riding, no pulling the tail.",
            "Never approach while they are eating, chewing a bone, or asleep.",
            "Never chase them when they walk away.",
            "To play, call them over and let them choose to come.",
          ],
        },
        { t: "h", text: "Rules for the parent" },
        {
          t: "ul",
          items: [
            "Always supervise children under six around a pet, especially in the first weeks.",
            "Give the pet a retreat the child may not enter — a crate, a bed, or a room.",
            "Put the food bowl somewhere the child does not go at mealtimes.",
            "Let the child help with feeding and brushing, with guidance — it builds a bond and a sense of responsibility.",
            "Teach the child to wash their hands after playing.",
          ],
        },
        { t: "h", text: "Breeds that suit a house with children" },
        {
          t: "p",
          text: 'Individual temperament matters more than breed, but some are known for patience with children: Golden Retriever, Beagle and Corgi among dogs; British Shorthair and Ragdoll among cats. Every breed page on MiewwL Pet House carries a "Good with children" rating so you can compare at a glance.',
        },
      ],
    },
  },

  {
    slug: "tap-cho-meo-dung-khay-cat",
    image: "/blog/litter-box.jpg",
    category: "training",
    date: "2026-08-06",
    readMinutes: 5,
    vi: {
      title: "Tập cho mèo dùng khay cát đúng cách",
      excerpt:
        "Mèo vốn có bản năng chôn chất thải, nên phần lớn trường hợp \"mèo đi bậy\" thật ra là do khay cát chưa đúng ý bé.",
      blocks: [
        {
          t: "p",
          text: "Đây là tin tốt: bạn gần như không phải dạy mèo dùng khay cát. Bản năng chôn chất thải có sẵn. Việc của bạn chỉ là đặt một cái khay mà bé thấy đủ sạch, đủ kín đáo và đủ dễ vào.",
        },
        { t: "h", text: "Chuẩn bị đúng ngay từ đầu" },
        {
          t: "ul",
          items: [
            "Số lượng khay = số mèo + 1. Hai bé thì ba khay.",
            "Khay đủ rộng: dài ít nhất bằng 1,5 lần chiều dài thân bé (không tính đuôi).",
            "Đặt ở nơi yên tĩnh, dễ tới, không phải ngõ cụt để bé không thấy bị dồn.",
            "Xa bát ăn và bát nước.",
            "Đổ cát dày khoảng 5-7cm để bé chôn được.",
          ],
        },
        { t: "h", text: "Ba ngày đầu khi bé mới về nhà" },
        {
          t: "ol",
          items: [
            "Giới hạn bé trong một phòng có sẵn khay cát, ổ nằm và bát ăn.",
            "Sau mỗi bữa ăn và sau khi bé ngủ dậy, nhẹ nhàng đặt bé vào khay.",
            "Khi bé dùng đúng, khen bằng giọng nhẹ hoặc một hạt thưởng — không vỗ tay to làm bé giật mình.",
            "Mở rộng dần phạm vi ra các phòng khác sau khi bé đã dùng khay ổn định.",
          ],
        },
        {
          t: "note",
          text: "Tuyệt đối không dí mũi bé vào chỗ đi bậy hay quát mắng. Mèo không liên hệ được hình phạt với hành vi đã xảy ra trước đó, chỉ học được rằng bạn đáng sợ.",
        },
        { t: "h", text: "Khi bé đang dùng tốt bỗng đi bậy" },
        {
          t: "p",
          text: "Đây gần như luôn có nguyên nhân. Hãy kiểm tra theo thứ tự:",
        },
        {
          t: "ol",
          items: [
            "Sức khoẻ trước tiên — viêm bàng quang và sỏi tiết niệu khiến bé đau khi đi và bắt đầu tránh khay. Đi khám nếu bé rặn nhiều, kêu khi đi, hoặc có máu.",
            "Khay có bẩn không? Nhiều bé từ chối khay chưa dọn trong ngày.",
            "Có đổi loại cát gần đây không? Mèo rất bảo thủ về chất nền.",
            "Vị trí có mới bị ồn, bị chắn, hoặc có bé khác canh chừng không?",
            "Có thay đổi lớn trong nhà gần đây không — khách lạ, chuyển đồ, thú cưng mới?",
          ],
        },
        {
          t: "p",
          text: "Chỗ đã đi bậy cần được làm sạch bằng dung dịch chứa enzyme, không dùng sản phẩm gốc amoniac — mùi amoniac gần giống nước tiểu và càng khiến bé quay lại đúng chỗ đó.",
        },
      ],
    },
    en: {
      title: "Litter training a cat properly",
      excerpt:
        "Cats instinctively bury their waste, so most cases of 'going in the wrong place' are really about a tray that does not suit them.",
      blocks: [
        {
          t: "p",
          text: "Here is the good news: you barely have to train a cat to use a litter tray. The instinct to bury is already there. Your job is simply to provide a tray they find clean enough, private enough and easy enough to get into.",
        },
        { t: "h", text: "Setting up correctly" },
        {
          t: "ul",
          items: [
            "Number of trays = number of cats + 1. Two cats, three trays.",
            "Big enough: at least one and a half times your cat's body length, not counting the tail.",
            "In a quiet, easy-to-reach spot — not a dead end where they could feel cornered.",
            "Away from food and water bowls.",
            "Fill to about 5-7cm so they can actually dig.",
          ],
        },
        { t: "h", text: "The first three days at home" },
        {
          t: "ol",
          items: [
            "Keep them in one room that has the tray, a bed and the food bowl.",
            "After each meal and after each nap, gently place them in the tray.",
            "When they use it, praise softly or give a treat — no loud clapping that startles them.",
            "Open up the rest of the house gradually once tray use is reliable.",
          ],
        },
        {
          t: "note",
          text: "Never rub a cat's nose in an accident or shout at them. Cats cannot connect a punishment to something they did earlier; all they learn is that you are frightening.",
        },
        { t: "h", text: "When a reliable cat suddenly stops" },
        {
          t: "p",
          text: "There is nearly always a reason. Check in this order:",
        },
        {
          t: "ol",
          items: [
            "Health first — cystitis and urinary stones make urinating painful, and the cat starts avoiding the tray. See a vet if there is straining, crying, or blood.",
            "Is the tray dirty? Plenty of cats refuse a tray that has not been cleaned that day.",
            "Have you changed litter recently? Cats are very conservative about substrate.",
            "Has the location become noisy, blocked, or guarded by another pet?",
            "Any big change at home — visitors, furniture moved, a new pet?",
          ],
        },
        {
          t: "p",
          text: "Clean any soiled spot with an enzyme cleaner, never an ammonia-based product — ammonia smells close enough to urine to draw the cat straight back to the same place.",
        },
      ],
    },
  },

  {
    slug: "5-lenh-co-ban-cho-cho-con",
    image: "/blog/dog-training.jpg",
    category: "training",
    date: "2026-08-04",
    readMinutes: 7,
    vi: {
      title: "5 lệnh cơ bản nên dạy chó con trước 6 tháng tuổi",
      excerpt:
        "Không cần trở thành huấn luyện viên. Năm lệnh này đủ để bé an toàn, dễ chăm và dễ hoà nhập với cả nhà.",
      blocks: [
        {
          t: "p",
          text: "Chó con học nhanh nhất trong khoảng 8 tuần đến 6 tháng tuổi. Mỗi buổi tập chỉ nên 5-10 phút, ngày 2-3 buổi, kết thúc khi bé vẫn còn hứng. Tập lâu quá làm bé chán và ghét việc học.",
        },
        {
          t: "note",
          text: "Chỉ dùng phần thưởng, không dùng hình phạt. Thưởng bằng hạt nhỏ, lời khen và vuốt ve. Phương pháp dựa trên sợ hãi tạo ra bé nghe lời vì lo lắng, và thường sinh ra vấn đề hành vi về sau.",
        },
        { t: "h", text: "1. Tên gọi — nền tảng của mọi lệnh khác" },
        {
          t: "p",
          text: "Gọi tên bé bằng giọng vui vẻ. Bé quay đầu nhìn bạn thì thưởng ngay. Lặp lại vài chục lần trong nhiều ngày. Quy tắc quan trọng: đừng bao giờ gọi tên bé rồi làm điều bé ghét (tắm, cắt móng, mắng) — nếu không tên gọi sẽ mất tác dụng.",
        },
        { t: "h", text: "2. Ngồi (Sit)" },
        {
          t: "ol",
          items: [
            "Cầm hạt thưởng trước mũi bé, đưa từ từ lên cao và ra sau đầu.",
            "Mông bé sẽ tự hạ xuống khi mắt dõi theo tay.",
            "Ngay khoảnh khắc mông chạm sàn, nói \"Ngồi\" và thưởng.",
            "Sau khoảng 20-30 lần, bắt đầu nói \"Ngồi\" trước rồi mới ra tay hiệu.",
          ],
        },
        { t: "h", text: "3. Lại đây (Come)" },
        {
          t: "p",
          text: "Đây là lệnh cứu mạng — dùng khi bé sắp chạy ra đường. Tập trong nhà trước, khoảng cách ngắn, luôn thưởng thật hậu. Không bao giờ dùng lệnh này để gọi bé lại rồi phạt, và không bao giờ gọi khi bạn không chắc bé sẽ đến.",
        },
        { t: "h", text: "4. Đứng yên (Stay)" },
        {
          t: "ol",
          items: [
            "Cho bé ngồi, xoè lòng bàn tay về phía bé, nói \"Đứng yên\".",
            "Đợi 2 giây, quay lại thưởng ngay tại chỗ bé đang ngồi.",
            "Tăng dần thời gian trước, sau đó mới tăng khoảng cách.",
            "Luôn quay lại chỗ bé để thưởng, thay vì gọi bé tới — nếu không bé sẽ học thành \"đứng yên rồi chạy tới\".",
          ],
        },
        { t: "h", text: "5. Bỏ ra (Leave it)" },
        {
          t: "p",
          text: "Lệnh này ngăn bé nuốt phải đồ nguy hiểm khi đi dạo. Đặt hạt thưởng trong lòng bàn tay nắm lại, để bé ngửi và cào. Khi bé bỏ cuộc và lùi ra, nói \"Bỏ ra\" và thưởng bằng một hạt KHÁC từ tay kia. Nâng dần độ khó: hạt để hở trên sàn, rồi đồ vật thật khi đi dạo.",
        },
        { t: "h", text: "Xã hội hoá cũng quan trọng ngang huấn luyện" },
        {
          t: "p",
          text: "Trước 16 tuần tuổi, hãy cho bé làm quen nhẹ nhàng với nhiều loại người, âm thanh, bề mặt và tình huống — trong phạm vi an toàn nếu bé chưa tiêm đủ. Một bé được xã hội hoá tốt sẽ ít sợ hãi và ít hung dữ khi trưởng thành hơn hẳn.",
        },
      ],
    },
    en: {
      title: "5 basic commands to teach a puppy before six months",
      excerpt:
        "You do not need to be a trainer. These five commands are enough to keep a puppy safe, easy to care for and easy to live with.",
      blocks: [
        {
          t: "p",
          text: "Puppies learn fastest between eight weeks and six months. Keep each session to 5-10 minutes, two or three times a day, and stop while they are still keen. Long sessions bore them and sour them on learning.",
        },
        {
          t: "note",
          text: "Reward only, never punish. Use small treats, praise and a fuss. Fear-based methods produce a dog that obeys out of anxiety, and usually create behaviour problems later.",
        },
        { t: "h", text: "1. Their name — the base for everything else" },
        {
          t: "p",
          text: "Say the name in a bright voice. The moment they turn to look at you, reward. Repeat dozens of times over several days. One important rule: never call their name and then do something they hate — a bath, nail clipping, a telling-off — or the name stops working.",
        },
        { t: "h", text: "2. Sit" },
        {
          t: "ol",
          items: [
            "Hold a treat at their nose, then move it slowly up and back over their head.",
            "Their rear drops as their eyes follow your hand.",
            'The instant it touches the floor, say "Sit" and reward.',
            'After 20-30 repetitions, start saying "Sit" first and only then give the hand signal.',
          ],
        },
        { t: "h", text: "3. Come" },
        {
          t: "p",
          text: "This is the lifesaving one — the command for when your dog is about to run into the road. Practise indoors first, over short distances, and reward generously every time. Never use it to call them over and then punish them, and never use it when you are not confident they will come.",
        },
        { t: "h", text: "4. Stay" },
        {
          t: "ol",
          items: [
            'Put them in a sit, show a flat palm, and say "Stay".',
            "Wait two seconds, then walk back and reward them where they are sitting.",
            "Build up the duration first, and only then the distance.",
            'Always return to reward rather than calling them to you — otherwise they learn "stay, then run over".',
          ],
        },
        { t: "h", text: "5. Leave it" },
        {
          t: "p",
          text: 'This one stops your dog swallowing something dangerous on a walk. Hold a treat in a closed fist and let them sniff and paw at it. When they give up and back off, say "Leave it" and reward with a DIFFERENT treat from your other hand. Raise the difficulty gradually: treat visible on the floor, then real objects out on walks.',
        },
        { t: "h", text: "Socialising matters as much as training" },
        {
          t: "p",
          text: "Before 16 weeks, introduce your puppy gently to a wide range of people, sounds, surfaces and situations — within safe limits if the vaccination course is not finished. A well-socialised puppy grows into a markedly less fearful and less reactive adult.",
        },
      ],
    },
  },

  {
    slug: "xu-ly-cho-sua-nhieu-va-can-do",
    image: "/blog/kids-playing.jpg",
    category: "training",
    date: "2026-08-02",
    readMinutes: 6,
    vi: {
      title: "Xử lý chó sủa nhiều và cắn phá đồ đạc",
      excerpt:
        "Hai vấn đề khiến chủ nuôi đau đầu nhất, và cả hai đều là triệu chứng chứ không phải nguyên nhân.",
      blocks: [
        {
          t: "p",
          text: "Sủa nhiều và cắn phá thường bị coi là \"bé hư\". Thực tế đó là cách bé xử lý một nhu cầu chưa được đáp ứng — thiếu vận động, buồn chán, lo lắng, hoặc đơn giản là đang mọc răng. Chữa triệu chứng mà không chạm tới nguyên nhân thì hành vi sẽ chuyển sang dạng khác.",
        },
        { t: "h", text: "Trước hết: bé có đủ vận động không?" },
        {
          t: "p",
          text: "Một bé chó trưởng thành thường cần 30-60 phút vận động thật sự mỗi ngày, và giống năng động cần nhiều hơn. Quan trọng không kém là vận động trí óc: đồ chơi giấu thức ăn, bài tập đánh hơi, buổi tập lệnh ngắn. 15 phút dùng đầu làm bé mệt hơn 30 phút chạy bộ.",
        },
        { t: "h", text: "Sủa: tìm đúng loại trước khi xử lý" },
        {
          t: "ul",
          items: [
            "Sủa cảnh báo (có người qua cửa): chắn tầm nhìn ra cửa sổ, dạy lệnh \"vào chỗ\" và thưởng khi bé im.",
            "Sủa đòi chú ý: tuyệt đối không phản hồi lúc bé đang sủa; chỉ chú ý khi bé im được vài giây.",
            "Sủa vì buồn chán: tăng vận động và đồ chơi trí tuệ.",
            "Sủa vì lo âu khi ở một mình: đây là vấn đề riêng, xem mục dưới.",
          ],
        },
        {
          t: "note",
          text: "Quát \"im đi\" thường phản tác dụng — với bé, đó là bạn cũng đang sủa cùng. Hãy dạy lệnh \"im lặng\" bằng cách thưởng đúng khoảnh khắc bé ngừng.",
        },
        { t: "h", text: "Cắn phá đồ đạc" },
        {
          t: "ol",
          items: [
            "Với bé dưới 6 tháng, phần lớn là do mọc răng. Cung cấp đồ gặm phù hợp và làm mát chúng trong tủ lạnh để dịu nướu.",
            "Cất kỹ những thứ bạn không muốn mất: giày, dây điện, điều khiển.",
            "Khi bắt gặp bé đang gặm đồ sai, đừng mắng — đổi ngay sang đồ gặm đúng rồi khen khi bé chuyển.",
            "Luân phiên đồ chơi mỗi tuần để bé không chán.",
          ],
        },
        { t: "h", text: "Khi nào cần chuyên gia" },
        {
          t: "p",
          text: "Nếu bé chỉ phá và sủa khi ở nhà một mình, kèm chảy dãi, cào cửa, đi vệ sinh trong nhà dù đã quen — đó có thể là lo âu chia ly, và cần một kế hoạch riêng, đôi khi kèm hỗ trợ từ bác sĩ thú y. Tương tự với bất kỳ hành vi hung dữ nào với người hoặc thú cưng khác: hãy tìm huấn luyện viên có chuyên môn về hành vi thay vì tự xử lý.",
        },
      ],
    },
    en: {
      title: "Dealing with barking and destructive chewing",
      excerpt:
        "The two problems owners struggle with most — and both are symptoms rather than causes.",
      blocks: [
        {
          t: "p",
          text: 'Excessive barking and chewing usually get labelled "a badly behaved dog". In practice they are how a dog copes with an unmet need — too little exercise, boredom, anxiety, or simply teething. Treat the symptom without touching the cause and the behaviour just changes shape.',
        },
        { t: "h", text: "First: is your dog getting enough exercise?" },
        {
          t: "p",
          text: "An adult dog typically needs 30-60 minutes of real exercise a day, and active breeds need more. Mental work matters just as much: food puzzles, scent games, short training sessions. Fifteen minutes of thinking tires a dog more than half an hour of jogging.",
        },
        { t: "h", text: "Barking: identify the type first" },
        {
          t: "ul",
          items: [
            'Alert barking at people passing: block the view from the window, teach a "go to your place" cue and reward quiet.',
            "Attention barking: give no response at all while they bark; give attention only after a few seconds of quiet.",
            "Boredom barking: more exercise and more puzzle toys.",
            "Barking when left alone: that is a separate problem, see below.",
          ],
        },
        {
          t: "note",
          text: 'Shouting "quiet" usually backfires — to a dog, it sounds like you joined in. Teach a "quiet" cue by rewarding the exact moment they stop.',
        },
        { t: "h", text: "Destructive chewing" },
        {
          t: "ol",
          items: [
            "Under six months it is mostly teething. Provide proper chew toys and chill them in the fridge to soothe the gums.",
            "Put away what you do not want lost: shoes, cables, remote controls.",
            "If you catch them chewing the wrong thing, do not scold — swap in the right chew and praise the moment they take it.",
            "Rotate the toys weekly so they do not get bored.",
          ],
        },
        { t: "h", text: "When to get professional help" },
        {
          t: "p",
          text: "If the barking and destruction only happen when your dog is left alone, along with drooling, scratching at doors, or toileting indoors despite being house-trained, that may be separation anxiety. It needs its own plan, sometimes with veterinary support. The same applies to any aggression towards people or other pets: find a trainer qualified in behaviour rather than working it out alone.",
        },
      ],
    },
  },
];
