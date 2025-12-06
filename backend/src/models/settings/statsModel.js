const BaseModel = require('./baseModel');

const defaultStatsSettings = {
  stats: [
    { label: 'Khách Hàng Tin Dùng', value: 232 },
    { label: 'Dự Án Hoàn Thành', value: 521 },
    { label: 'Giờ Hỗ Trợ Kỹ Thuật', value: 1453 },
    { label: 'Thành Viên Đội Ngũ', value: 32 }
  ]
};

class StatsModel extends BaseModel {
  constructor() {
    super('stats-settings.json', defaultStatsSettings);
  }

  mergeWithDefaults(settings) {
    return {
      ...this.defaultSettings,
      ...settings,
      stats: settings.stats || this.defaultSettings.stats
    };
  }
}

module.exports = new StatsModel();

