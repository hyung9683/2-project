<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light position-relative" style="top: 3rem;">
            <div class="col-md-4"></div>
            <div class="col-md-5">
                <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control search-input" placeholder="Search....">
                        <button type="button" class="btn btn-light search-button">
                            <i class="bi bi-search text-danger"></i>
                        </button>
                    </div>
                </form>
            </div>
        </nav>
        <div class="col-md-3"></div>
        <div class="container" style="position:relative; top:5rem; border-left: 2px groove #eee; border-right: 2px groove #eee;" id="content">
            <div class="d-flex text-align-center" id="MainContent">
                <div class="col-4" style="border-right: 2px groove #eee; padding-right:0.7rem;">
                    <div style="text-align: center;">카드</div>
                        <div class="mt-2 imageQuiz">
                            <div class="container-fluid" style="text-align: center; box-shadow: 0 1px 0;">
                                <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                                <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                                <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            </div>
                            <div class="container-fluid" style="text-align: center; box-shadow: 0 1px 0;">
                                <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                                <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                                <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            </div>
                        </div>
                    </div>
                <div class="col-4" style="border-right: 2px groove #eee; padding-right:0.7rem; margin-left:0.7rem;">
                    <div style="text-align: center;">카드2</div>
                    <div class="mt-2 imageQuiz">
                        <div class="container-fluid" style="text-align: center; box-shadow: 0 1px 0;">
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                        </div>
                        <div class="container-fluid" style="text-align: center; box-shadow: 0 1px 0;">
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                            <img class="img-fluid col-3 mx-2" src="../assets/logo.png" />
                        </div>
                    </div>
                </div>
                <div class="col-4" style="margin-left:0.7rem; padding-right: 1.2rem;">
                    <div style="text-align: center;">공지사항</div>
                    <div class="mt-2 announcmentMainList">
                        <div class="bottom-border pb-2 announcment">공지사항 첫번째 작성</div>
                        <div class="bottom-border pb-2 announcment">공지사항 첫번째 작성</div>
                        <div class="bottom-border pb-2 announcment">공지사항 첫번째 작성</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
    return {
        example: '',
    }
}, 
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    computed: {},
    beforeUpdate() {}, 
    updated() {}, 
    beforeUnmount() {},
    unmounted() {},
    methods: {}
}
</script>