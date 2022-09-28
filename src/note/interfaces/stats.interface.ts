export interface IStats {
  active: IStatsCategory;
  archive: IStatsCategory;
}

export interface IStatsCategory {
  Task: number;
  Idea: number;
  Quote: number;
  "Random Thought": number;
}
