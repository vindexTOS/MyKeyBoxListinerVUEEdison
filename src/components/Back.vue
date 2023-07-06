<template>
    <div v-if="to">
        <router-link
            :to="to"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
            custom
        >
            <a :href="href" @click="customClick($event, navigate)" class="back font-montserrat">
                <div class="inside-wrapper">
                    <svg class="arrow" width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.49162 16.825C9.03601 17.2806 8.29732 17.2806 7.84171 16.825L0.841704 9.82498C0.386094 9.36936 0.386094 8.63067 0.841704 8.17506L7.84171 1.17506C8.29732 0.719449 9.03601 0.719449 9.49162 1.17506C9.94724 1.63067 9.94724 2.36936 9.49162 2.82498L4.48325 7.83335L20.3333 7.83335C20.9777 7.83335 21.5 8.35569 21.5 9.00002C21.5 9.64435 20.9777 10.1667 20.3333 10.1667L4.48325 10.1667L9.49162 15.1751C9.94724 15.6307 9.94724 16.3694 9.49162 16.825Z" fill="white"/>
                    </svg>
                    <span class="text-back">
                    Back
                </span>
                </div>
            </a>
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
.back {
  border-radius: 16px;
  border: 1px solid white;
  color: white;
    padding: 14px 16px;
    position: absolute;
    left: 20px;
    top: 20px;
}
.inside-wrapper {
    display: flex;
    justify-content: left;
    .arrow {
        margin-top: 3px;
    }
    .text-back {
        margin-left: 10px;
    }
}
</style>

<script>
export default {
    props: {
        to: Object,
        click: Function,
    },
    methods: {
        customClick($event, navigate) {
            if (this.click) {
                this.click($event)
            }
            return navigate($event)
        }
    }
}
</script>