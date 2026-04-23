export interface AchievementItem {
  id: string;
  credential_id?: string | null;
  name: string;
  issuing_organization: string;
  category: string;
  issue_date: string;
  expiration_date?: string | null;
  image: string;
  is_show: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AchievementItemWithCredential extends AchievementItem {
  url_credential: string;
}
