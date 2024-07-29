import {ref} from 'vue';

export const useResize = () => {

    const headerHeight = ref(0);

    const updateHeight = (element) => {

        if (element) {

            headerHeight.value = element.offsetHeight;
            this.emitter.emit('headerHeight', headerHeight.value);
        }
    };

    return { headerHeight, updateHeight};
}