import Dexie, { type Table } from "dexie"

export class AppSettings<K extends keyof AllSettings = keyof AllSettings> {
  private db: SettingsDatabase<K>

  constructor() {
    this.db = new SettingsDatabase()
  }

  async set(key: K, value: AllSettings[K]) {
    await this.db.settings.put({ key, value })
  }
  async get(key: K) {
    return (await this.db.settings.get(key))?.value
  }

  async getAll() {
    const settings = {} as AllSettings

    await this.db.settings.each((setting) => {
      settings[setting.key] = setting.value
    })

    return settings
  }
}

class SettingsDatabase<
  K extends keyof AllSettings = keyof AllSettings,
> extends Dexie {
  settings!: Table<{ key: K; value: AllSettings[K] }, K>

  constructor() {
    super("Settings")
    this.version(1).stores({
      settings: "key",
    })
  }
}
