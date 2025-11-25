// /utils/dateHelper.ts

/**
 * Lấy thời gian hiện tại theo múi giờ Việt Nam và trả về ISO string (yyyy-MM-ddTHH:mm:ss)
 */
export const getVietnamTimeISO = (): string => {
    const now = new Date();
    const offset = 7 * 60; // UTC+7
    const localTime = new Date(now.getTime() + offset * 60 * 1000);
    return localTime.toISOString().slice(0, 19); // "2025-11-24T18:05:42"
};
