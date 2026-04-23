import {
  AchievementItem,
  AchievementItemWithCredential,
} from "@/common/types/achievements";
import {
  achievementsData,
  DEFAULT_CREDENTIAL_URL,
} from "@/common/constants/achievements-data";

interface GetAchievementsDataProps {
  category?: string;
  search?: string;
}

/**
 * Add credential URL to achievement item
 */
const addCredentialUrl = (
  achievement: AchievementItem,
): AchievementItemWithCredential => ({
  ...achievement,
  url_credential: DEFAULT_CREDENTIAL_URL,
});

/**
 * Get all achievements that are marked as shown
 */
export const getAllAchievements = (): AchievementItemWithCredential[] => {
  return achievementsData
    .filter((achievement) => achievement.is_show)
    .map(addCredentialUrl);
};

/**
 * Get all visible achievements, optionally filtered by category and/or search term
 */
export const getAchievementsData = ({
  category,
  search,
}: GetAchievementsDataProps): AchievementItemWithCredential[] => {
  let results = achievementsData.filter((achievement) => achievement.is_show);

  if (category && category.trim()) {
    results = results.filter(
      (achievement) =>
        achievement.category?.toLowerCase() === category.toLowerCase(),
    );
  }

  if (search && search.trim()) {
    const searchLower = search.toLowerCase();
    results = results.filter(
      (achievement) =>
        achievement.name.toLowerCase().includes(searchLower) ||
        achievement.issuing_organization.toLowerCase().includes(searchLower),
    );
  }

  return results.map(addCredentialUrl);
};

/**
 * Get achievement by ID
 */
export const getAchievementById = (
  id: string,
): AchievementItemWithCredential | undefined => {
  const achievement = achievementsData.find(
    (achievement) => achievement.id === id && achievement.is_show,
  );
  return achievement ? addCredentialUrl(achievement) : undefined;
};

/**
 * Get all unique categories from achievements
 */
export const getAchievementCategories = (): string[] => {
  const categories = new Set(
    achievementsData
      .filter((achievement) => achievement.is_show)
      .map((achievement) => achievement.category),
  );
  return Array.from(categories).sort();
};

/**
 * Get count of achievements by category
 */
export const getAchievementCountByCategory = (): Record<string, number> => {
  const counts: Record<string, number> = {};

  achievementsData
    .filter((achievement) => achievement.is_show)
    .forEach((achievement) => {
      counts[achievement.category] = (counts[achievement.category] || 0) + 1;
    });

  return counts;
};
