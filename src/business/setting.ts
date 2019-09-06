export class Setting {
  name: string
  file: string
  isSelected: boolean

  constructor(name: string, file: string, isSelected: boolean) {
    this.name = name
    this.file = file
    this.isSelected = isSelected
  }

  // noinspection JSMethodCanBeStatic
  isDefault(): boolean {
    return this.name === 'default'
  }

  select() {
    this.isSelected = true
  }

  unselect() {
    this.isSelected = false
  }

}
