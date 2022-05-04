import Vue from 'vue'

import {MessageBox, Message, Button, Carousel, CarouselItem, Col, Row, Menu, MenuItem, Link, Card,
        Image, Avatar, Pagination, Divider, Form, FormItem, Input, DropdownMenu, Dropdown, DropdownItem,
        Upload, Dialog, Select, Option, Checkbox, Empty, Table, TableColumn, Tag} from "element-ui";

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

const element = {
    install: function (Vue) {
        Vue.use(Button)
        Vue.use(Carousel)
        Vue.use(CarouselItem)
        Vue.use(Col)
        Vue.use(Row)
        Vue.use(Menu)
        Vue.use(MenuItem)
        Vue.use(Link)
        Vue.use(Card)
        Vue.use(Image)
        Vue.use(Avatar)
        Vue.use(Pagination)
        Vue.use(Divider)
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Input)
        Vue.use(Dropdown)
        Vue.use(DropdownItem)
        Vue.use(DropdownMenu)
        Vue.use(Upload)
        Vue.use(Dialog)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Checkbox)
        Vue.use(Empty)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Tag)
    }
}

export default element