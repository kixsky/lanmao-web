<template>
  <div>
    <Table :columns="tableHeader" :data="tableData"></Table>
    <van-pagination v-model="pageParams.page" :total-items="pageParams.totalCount" :items-per-page="10" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tableHeader: [
        {
          title: "会员信息",
          key: "name"
        },
        {
          title: "注册时间",
          key: "注册时间"
        },
        {
          title: "会员余额",
          key: "balance"
        },
        {
          title: "累计消费",
          key: "累计消费"
        },
        {
          title: "上次消费",
          key: "上次消费"
        },
        {
          title: "操作",
          key: "操作",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      tableData: [],
      pageParams: {
        page: 1,
        pageSize: 10,
        totalCount: 0,
        params: {}
      }
    };
  },
  mounted() {
    var self = this;
    this.$http
      .post(this.$api.User.QueryPage, this.pageParams, false)
      .then(res => {
        var resData = res.data;
        if (resData.code == 0) {
          var pageData = resData.data;
          self.tableData = pageData.list;
          self.pageParams.totalCount = pageData.totalCount;
        }
      });
  },
  nextPage() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center-me {
  margin: 0 auto;
}
</style>
