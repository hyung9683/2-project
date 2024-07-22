<template>
<nav class="navbar navbar-expand-md navbar-light">
         <button class="navbar-toggler ml-auto mb-2 bg-light" type="button" data-toggle="collapse" data-target="#sidebar">
             <span class="navbar-toggle-icon"></span>
         </button>
 <!-- top navbar -->
 <div id="top-navbar" class="col-lg-12 ms-auto bg-dark fixed-top py-2">
    <div class="row align-items-center">
        <div class="col-md-4">
            <h4 class="nav navbar-toggle flex-colum text-light text-uppercase mb-0"><button style="border:none;" @click="SideBarMenu"><i class="bi bi-list mx-1 me-2"></i></button><a class="nav-link text-light" href="#">로고</a></h4>
        </div>
        <div class="col-md-5"></div>
        <div class="col-md-3" style="padding-left: 15%;">
            <ul class="navbar-nav">
                <li class="nav-item"><a href="#" class="nav-link"><i class="bi bi-chat-dots text-white bi-lg"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link"><i class="bi bi-person-square text-white bi-lg"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link"><i class="bi bi-box-arrow-right text-danger bi-lg"></i></a></li>
            </ul>
        </div>
    </div>
</div>
    <!-- /top navbar -->
</nav>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
    return {

    }
}, 
    created() {},
    mounted() {},
    computed: {},
    methods: {
        SideBarMenu() {
            this.emitter.emit('DOMContentLoaded', () => {
                
                const SidbarPosition = () => {
                    let navbarHeight = document.getElementById("top-navbar").offsetHeight;
                }

            })

        }
    }
}
</script>