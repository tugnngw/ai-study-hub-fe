// src/features/shares/hooks/useShares.tsx
// Tải dữ liệu chia sẻ + lọc theo từ khóa + sắp xếp Mới/Cũ + phân trang.
import { useEffect, useMemo, useState } from "react";
import { sharesApi } from "../services";
import type {
  SharedWithMeItem,
  SharedByMeItem,
  ShareSort,
} from "../types/share.types";

const PAGE_SIZE = 4;

export function useShares() {
  const [withMe, setWithMe] = useState<SharedWithMeItem[]>([]);
  const [byMe, setByMe] = useState<SharedByMeItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [sort, setSort] = useState<ShareSort>("oldest");
  const [pageWithMe, setPageWithMe] = useState(1);
  const [pageByMe, setPageByMe] = useState(1);

  // tải danh sách (client-only, an toàn SSR)
  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([sharesApi.getSharedWithMe(), sharesApi.getSharedByMe()])
      .then(([a, b]) => {
        if (alive) {
          setWithMe(a);
          setByMe(b);
        }
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  // reset trang khi lọc/sắp xếp đổi
  useEffect(() => {
    setPageWithMe(1);
    setPageByMe(1);
  }, [q, sort]);

  const match = (s: string) => s.toLowerCase().includes(q.toLowerCase());
  const sortFn = <T extends { order: number }>(a: T, b: T) =>
    sort === "newest" ? b.order - a.order : a.order - b.order;

  const filteredWithMe = useMemo(
    () =>
      withMe
        .filter((x) => match(x.name) || match(x.sharedBy.name))
        .sort(sortFn),
    [withMe, q, sort],
  );
  const filteredByMe = useMemo(
    () => byMe.filter((x) => match(x.name)).sort(sortFn),
    [byMe, q, sort],
  );

  const pagedWithMe = filteredWithMe.slice(
    (pageWithMe - 1) * PAGE_SIZE,
    pageWithMe * PAGE_SIZE,
  );
  const pagedByMe = filteredByMe.slice(
    (pageByMe - 1) * PAGE_SIZE,
    pageByMe * PAGE_SIZE,
  );

  return {
    loading,
    q,
    setQ,
    sort,
    setSort,
    // được chia sẻ với tôi
    withMeCount: filteredWithMe.length,
    pagedWithMe,
    pageWithMe,
    setPageWithMe,
    totalPagesWithMe: Math.max(1, Math.ceil(filteredWithMe.length / PAGE_SIZE)),
    // tôi đã chia sẻ
    byMeCount: filteredByMe.length,
    pagedByMe,
    pageByMe,
    setPageByMe,
    totalPagesByMe: Math.max(1, Math.ceil(filteredByMe.length / PAGE_SIZE)),
    // cập nhật state sau khi xóa
    removeWithMeLocal: (id: number) =>
      setWithMe((l) => l.filter((x) => x.id !== id)),
    removeByMeLocal: (id: number) =>
      setByMe((l) => l.filter((x) => x.id !== id)),
  };
}
