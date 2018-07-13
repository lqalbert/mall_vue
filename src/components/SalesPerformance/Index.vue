<template>
    <div>
        <IndexAdmin v-if="isAdmin"/>
        <IndexDepart v-if="isDepart"/>
        <IndexGroup v-if="isGroup"/>
    </div>
</template>
<script>
    import PageMix from '../../mix/Page';
    
    import IndexAdmin from './admin/IndexAdmin';
    import IndexDepart from './depart/IndexDepart';
    import IndexGroup from './group/IndexGroup';
    import { mapActions,mapGetters } from 'vuex';

    export default {
        name: 'SalesPerformance',
        pageTitle:"销售量化",
        mixins: [PageMix],
        components: {
            IndexAdmin,
            IndexDepart,
            IndexGroup
        },
        data() {
            return {
                page_admin: false,
                page_depart: false, 
                page_group:  false,
            }
        },
        computed:{
            isAdmin(){
                return this.page_admin;
            },
            isDepart(){
                return this.page_depart;
            },
            isGroup(){
                return this.page_group;
            }
            
        },
        methods: {
            setPageAdmin(){
                if (this.$store.getters.hasRole('administrator') || 
                    this.$store.getters.hasRole('super-manager') ||
                    this.$store.getters.hasRole('finance') ) {
                    this.page_admin = true;
                    this.page_depart = false;
                    this.page_group = false; 
                } 
            },
            setPageDepart(){
                
                if (this.$store.getters.hasRole('sale-manager')) {
                    this.page_depart = true;

                    this.page_admin = false;
                    this.page_group = false;
                } 
            },
            setPageGroup(){
                if (this.$store.getters.hasRole('sale-captain')) {
                    this.page_group = true;

                    this.page_depart = false;
                    this.page_admin = false;
                } 
            },
            

        },
        created() {
            this.setPageGroup();
            this.setPageDepart();
            this.setPageAdmin();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .sl-bar {
        width: 100%;
        height: 10px;
        background: red;
    }
    .sl-bar:hover {
        cursor: n-resize;
    }

    .bar-wrapper-move .sl-bar{
        cursor: n-resize;
    }
</style>
