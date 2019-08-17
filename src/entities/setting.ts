import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity('settings')
export class Setting {
  @PrimaryColumn({name: 'name', type: 'text'})
  name?: string
  @Column({name: 'file', type: 'text'})
  file?: string
  @Column({name: 'isSelected', type: 'integer'})
  isSelected?: number

}
