<template>
    <div>
        <label for="text"><slot name="label"></slot></label>
        <input type="text" id="text" v-model="value">
        <button @click="passUp" :disabled="!value.length"><slot name="btn-text"></slot></button>
    </div>
</template>

<script>
export default {
    name: 'InputButton',
    data() {
        return {
            value: ''
        }
    },
    methods: {
        passUp() {
            this.$emit('pass-up', this.value);
        }
    }
}
</script>
