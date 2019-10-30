<template>
  <div>
    <div class="div-btn">
      <Button type="info" @click="modal6 = true" class="new-mech">新增优惠券</Button>
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
    <Modal v-model="modal6" :title="mechTitle" width="650" :loading="loading" @on-ok="asyncOK">
      <Row align="middle" justify="center">
        <Col span="4">
          <span class="tt">优惠券名称</span>
        </Col>
        <Col span="20">
          <Input v-model="couponData.name" placeholder="优惠券名称" style="width: 300px"></Input>
        </Col>
      </Row>
      <Row align="middle" justify="center" class-name="tl">
        <Col span="4">
          <span class="tt">生效日期起期</span>
        </Col>
        <Col span="20">
          <DatePicker
            v-model="couponData.effectiveDate"
            type="date"
            placeholder="生效日期起期"
            style="width: 300px"
          ></DatePicker>
        </Col>
      </Row>
      <Row align="middle" justify="center" class-name="tl">
        <Col span="4">
          <span class="tt">生效日期止期</span>
        </Col>
        <Col span="20">
          <DatePicker
            v-model="couponData.expiryDate"
            type="date"
            placeholder="生效日期止期"
            style="width: 300px"
          ></DatePicker>
        </Col>
      </Row>
      <Row align="middle" justify="center" class-name="tl">
        <Col span="4">
          <span class="tt">优惠金额</span>
        </Col>
        <Col span="20">
          <Input v-model="couponData.discount" placeholder="优惠金额" style="width: 300px"></Input>
        </Col>
      </Row>
      <Row align="middle" justify="center" class-name="tl">
        <Col span="4">
          <span class="tt">优惠规则</span>
        </Col>
        <Col span="20">
          <Select v-model="couponData.ruleCode" style="width:200px">
            <Option v-for="item in ruleList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </Col>
      </Row>
      <Row align="middle" justify="center" class-name="tl">
        <Col span="4">
          <span class="tt">优惠券类型</span>
        </Col>
        <Col span="20">
          <Select v-model="couponData.type" style="width:200px">
            <Option v-for="item in typeList" :value="item.type" :key="item.type">{{ item.name }}</Option>
          </Select>
        </Col>
      </Row>
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
      mechTitle: "新增优惠券",
      modal6: false,
      loading: true,
      couponData: {
        name: "",
        effectiveDate: "",
        expiryDate: "",
        discount: "",
        type: '',
        ruleCode: '',
        ruleName: ''
      },
      ruleList: [
        {
          name: '无门槛使用',
          code: '1'
        }
      ],
      typeList: [
        {
          name: '到家优惠券',
          type: 1
        }
      ]
    };
  },
  mounted() {
    this.getCoupon();
  },
  methods: {
    getCoupon() {
      var self = this;
      this.$http
        .post(this.$api.Coupon.QueryPage, this.pageParams, false)
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
      this.getCoupon();
    },
    asyncOK() {
      this.addCoupon();
    },
    addCoupon() {
      var self = this;
      this.couponData.effectiveDate = this.$utils.dateFormat("YYYY-mm-dd HH:MM:SS", this.couponData.effectiveDate);
      this.couponData.expiryDate = this.$utils.dateFormat("YYYY-mm-dd HH:MM:SS", this.couponData.expiryDate);
      this.$http
        .post(this.$api.Coupon.AddCoupon, this.couponData, false)
        .then(res => {
          var resData = res.data;
          // self.loading = false;
          if (resData.code == 0) {
            self.modal6 = false;
          } else {
            self.$Message.error(resData.message);
          }
        })
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
.tt {
  margin-right: 5px;
}
.tl {
  margin-top: 10px;
}
</style>
