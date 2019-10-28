<template>
  <div>
    <div class="div-btn">
      <Button type="info" @click="modal6 = true" class="new-mech">新增技师</Button>
    </div>
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
    <!-- 技师弹窗 -->
    <Modal v-model="modal6" :title="mechTitle" :loading="loading" @on-ok="asyncOK">
      <p>After you click ok, the dialog box will close in 2 seconds.</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tableHeader: [
        {
          title: "技师信息",
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
          title: "当前状态",
          key: "balance"
        },
        {
          title: "销售业绩",
          key: "累计消费"
        },
        {
          title: "接单地址",
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
      },
      mechTitle: "新增技师",
      modal6: false,
      loading: true
    };
  },
  mounted() {
    this.getMech();
  },
  methods: {
    getMech() {
      var self = this;
      this.$http.post(this.$api.Mech.List, this.pageParams, false).then(res => {
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
      this.getMech();
    },
    asyncOK() {
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.center-me {
  margin: 0 auto;
}
.dd-page {
  float: right;
  margin: 10px;
}
.div-btn {
  height: 50px;
  .new-mech {
    float: right;
    margin: 5px 10px 0 0;
  }
}
</style>
