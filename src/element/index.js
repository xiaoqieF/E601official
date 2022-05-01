import Vue from 'vue'

import {MessageBox, Message, Button, Carousel, CarouselItem, Col, Row, Menu, MenuItem, Link, Card,
        Image, Avatar, Pagination, Divider} from "element-ui";

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
    }
}

export default element