<template>
  <div class="user">
    <div class="photo">
      <img src="https://media.licdn.com/dms/image/C5603AQEYzW0hzo16wg/profile-displayphoto-shrink_800_800/0/1626414287465?e=1688601600&v=beta&t=85JEl0PVFwPZ4smmMSSMyiUEwJqHYGiRxUW3MMfT2JY" alt="avatar"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click.stop="toggleMenu" href="#">
           <span>
             {{title}}
             <b class="caret"></b>
          </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <el-collapse-transition>
          <ul class="nav" v-show="!isClosed">
            <slot>
              <li>
                <a class="profile-dropdown" href="#pablo">
                  <span class="sidebar-mini">MP</span>
                  <span class="sidebar-normal">My Profile</span>
                </a>
              </li>
              <li>
                <a class="profile-dropdown" href="#pablo">
                  <span class="sidebar-mini">EP</span>
                  <span class="sidebar-normal">Edit Profile</span>
                </a>
              </li>
              <li>
                <a class="profile-dropdown" href="#pablo">
                  <span class="sidebar-mini">S</span>
                  <span class="sidebar-normal">Settings</span>
                </a>
              </li>
            </slot>
          </ul>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    props: {
      title: {
        type: String,
        default: 'Muhammad Hardwin V'
      }
    },
    data () {
      return {
        isClosed: true
      }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      }
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
