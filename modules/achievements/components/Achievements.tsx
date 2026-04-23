"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import EmptyState from "@/common/components/elements/EmptyState";
import { AchievementItemWithCredential } from "@/common/types/achievements";
import { getAchievementsData } from "@/services/achievements";

import AchievementCard from "./AchievementCard";
import FilterHeader from "./FilterHeader";

const Achievements = () => {
  const t = useTranslations("AchievementsPage");
  const params = useSearchParams();

  const category = params.get("category");
  const search = params.get("search");

  // Get filtered achievements using local data
  const filteredAchievements: AchievementItemWithCredential[] = useMemo(() => {
    const data = getAchievementsData({
      category: category || undefined,
      search: search || undefined,
    });

    // Sort by ID in descending order
    return data.sort((a, b) => {
      const aId = parseInt(a.id.replace(/\D/g, ""), 10) || 0;
      const bId = parseInt(b.id.replace(/\D/g, ""), 10) || 0;
      return bId - aId;
    });
  }, [category, search]);

  return (
    <section className="space-y-4">
      <FilterHeader totalData={filteredAchievements?.length} />

      {filteredAchievements?.length === 0 && (
        <EmptyState message={t("no_data")} />
      )}

      {filteredAchievements.length !== 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {filteredAchievements?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AchievementCard {...item} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Achievements;
