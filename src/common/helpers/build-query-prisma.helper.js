export const buildQueryPrisma = (req) => {
  let { page, pageSize, filters } = req.query;

  console.log(filters);

  try {
    filters = JSON.parse(filters);
  } catch (error) {
    filters = {};
  }

  // Xử lý filter dạng string
  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === "string") {
      filters[key] = {
        contains: value,
      };
    }
  });

  const pageDefault = 1;
  const pageSizeDefault = 3;

  console.log(page, pageSize);

  page = Number(page);
  pageSize = Number(pageSize);

  // Nếu gửi chữ hoặc không gửi
  page = page || pageDefault;
  pageSize = pageSize || pageSizeDefault;

  // Nếu gửi số âm
  if (page < 1) page = pageDefault;
  if (pageSize < 1) pageSize = pageSizeDefault;

  const index = (page - 1) * pageSize;

  // Điều kiện tìm kiếm
  // Model Users không có trường isDeleted, nên chỉ dùng các filter hợp lệ từ request.
  const where = {
    ...filters,
  };

  return {
    where,
    page,
    pageSize,
    index,
  };
};
