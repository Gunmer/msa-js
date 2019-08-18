import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity('settings')
export class Setting {
  @PrimaryColumn({name: 'name', type: 'text'})
  name = ''
  @Column({name: 'file', type: 'text'})
  file = ''
  @Column({name: 'isSelected', type: 'integer'})
  selected = 0

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
