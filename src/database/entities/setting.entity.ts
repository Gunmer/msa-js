import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity('settings')
export class SettingEntity {
  @PrimaryColumn({name: 'name', type: 'text'})
  name: string
  @Column({name: 'file', type: 'text'})
  file: string
  @Column({name: 'isSelected', type: 'integer'})
  selected: number

  constructor(name: string, file: string, selected: number) {
    this.name = name
    this.file = file
    this.selected = selected
  }

}
