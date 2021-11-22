<template>
  <a-tree
    class="tree-demo"
    draggable
    show-line
    :data="treeData"
    @drop="onDrop"
  />
</template>
<script>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  export default {
    setup() {
      const treeData = ref([]);

      onMounted(() => {
        axios.get('http://localhost:4290/sort').then(res => {
          console.log(res);
          // treeData = res.data;
          treeData.value=res.data;
          // treeData.push(...res.data);
        });
      });
      return {
        treeData,
        onDrop({ dragNode, dropNode, dropPosition }) {
          const data = treeData.value;
          const loop = (data, key, callback) => {
            data.some((item, index, arr) => {
              if (item.key === key) {
                callback(item, index, arr);
                return true;
              }
              if (item.children) {
                return loop(item.children, key, callback);
              }
              return false;
            });
          };

          loop(data, dragNode.key, (_, index, arr) => {
            arr.splice(index, 1);
          });

          if (dropPosition === 0) {
            loop(data, dropNode.key, (item) => {
              item.children = item.children || [];
              item.children.push(dragNode);
            });
          } else {
            loop(data, dropNode.key, (_, index, arr) => {
              arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode);
            });
          }
        },
      };
    },
  };

</script>
<style scoped>
/* .tree-demo :deep(.tree-node-dropover) > :deep(.arco-tree-node-title),
.tree-demo :deep(.tree-node-dropover) > :deep(.arco-tree-node-title):hover, {
  animation: blinkBg 0.4s 2;
} */

@keyframes blinkBg {
  0% {
    background-color: transparent;
  }

  100% {
    background-color: var(--color-primary-light-1);
  }
}
</style>
