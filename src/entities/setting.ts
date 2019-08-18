import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity('settings')
export class Setting {
  @PrimaryColumn({name: 'name', type: 'text'})
  name: string
  @Column({name: 'file', type: 'text'})
  file: string
  @Column({name: 'isSelected', type: 'integer'})
  selected: number

  constructor(name: string, file?: string, selected?: number) {
    this.name = name
    this.file = file || `${name}.xml`
    this.selected = selected || 0
  }

  isDefault() {
    return this.file.length === 0 || this.name === 'default'
  }

  select() {
    this.selected = 1
  }

  unselect() {
    this.selected = 0
  }

  isSelected() {
    return this.selected === 1
  }
}
