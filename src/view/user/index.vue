<template>
  <div>
    <Table :columns="tableHeader" :data="tableData"></Table>
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
      tableData: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          userInfo: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          userInfo: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          userInfo: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center-me {
  margin: 0 auto;
}
</style>
