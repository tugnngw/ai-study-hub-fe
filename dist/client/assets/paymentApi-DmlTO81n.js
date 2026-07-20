import { n as e } from "./api-BDRotG0l.js";
var t = [
    {
      id: `PLUS`,
      name: `Premium Plus`,
      price: 99e3,
      tagline: `Phù hợp cho cá nhân học tập nghiêm túc`,
      features: [
        `Lưu trữ 50 GB`,
        `Tải lên không giới hạn`,
        `Trợ lý AI cơ bản`,
        `Không quảng cáo`,
      ],
    },
    {
      id: `PRO`,
      name: `Premium Pro`,
      price: 199e3,
      tagline: `Toàn bộ tính năng, dành cho người dùng chuyên sâu`,
      features: [
        `Lưu trữ 200 GB`,
        `Trợ lý AI nâng cao`,
        `Ưu tiên xử lý`,
        `Hỗ trợ 24/7`,
        `Chia sẻ nhóm`,
      ],
      highlighted: !0,
    },
  ],
  n = [
    {
      id: `bank`,
      category: `CHUYỂN KHOẢN`,
      title: `Nạp qua ngân hàng ACB`,
      description: `Chuyển khoản với nội dung — hệ thống tự động cộng tiền ngay sau 1 phút.`,
      instant: !0,
      recommended: !0,
    },
    {
      id: `card`,
      category: `THẺ ĐIỆN THOẠI`,
      title: `Nạp thẻ cào`,
      description: `Hỗ trợ Viettel, Vinaphone, Mobifone, Zing, Garena – tự động cộng số dư.`,
      instant: !0,
    },
  ],
  r = {
    bankName: `ACB Bank`,
    bankShort: `ACB`,
    accountName: `NGO THI HUYEN`,
    accountNumber: `22554141`,
    transferContent: `W23758B`,
  },
  i = {
    getTransactions: () => e(`/api/payment/transactions`),
    getPlanOptions: () => Promise.resolve([...t]),
    getTopUpMethods: () => Promise.resolve([...n]),
    getBankInfo: () => Promise.resolve({ ...r }),
  };
export { i as t };
