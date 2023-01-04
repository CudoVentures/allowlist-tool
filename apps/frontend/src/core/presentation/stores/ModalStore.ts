import { makeObservable, observable } from 'mobx';

export default class ModalStore {

    @observable visible = false;

    constructor() {
        makeObservable(this);
        this.hide = this.hide.bind(this);
    }

    show = () => {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

}
