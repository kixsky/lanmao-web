<template>
  <div>
    <Table :columns="tableHeader" :data="tableData"></Table>
    <div>
      <Page
        :total="pageParams.totalCount"
        :current="pageParams.page"
        :page-size="pageParams.pageSize"
        @on-change="nextPage"
        show-sizer
        class="dd-page"
      />
    </div>
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
          key: "name",
          render: (h, params) => {
            console.log(params);
            var row = params.row;
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  width: "100%",
                  height: "120px",
                  padding: "10px 0 0 5px"
                }
              },
              [
                h("img", {
                  attrs: {
                    src: "https://file.iviewui.com/asd/asd-pro-3.png"
                  },
                  style: {
                    width: "60px",
                    height: "60px",
                    borderRadius: "30px",
                    margin: "25px 0 0 0"
                  }
                }),
                h(
                  "div",
                  {
                    style: {
                      display: "block",
                      textAlign: "center",
                      margin: "25px 0 0 5px",
                      fontSize: "10px"
                    }
                  },
                  [
                    h(
                      "p",
                      {
                        style: {
                          textAlign: "center"
                        }
                      },
                      row.name
                    ),
                    h(
                      "p",
                      {
                        style: {
                          textAlign: "center"
                        }
                      },
                      row.mobile
                    )
                  ]
                )
              ]
            );
          }
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
    this.getUser();
  },
  methods: {
    getUser() {
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
    nextPage(nextPage) {
      this.pageParams.page = nextPage;
      this.getUser();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center-me {
  margin: 0 auto;
}
.dd-page {
  float: right;
  margin: 10px;
}
</style>
