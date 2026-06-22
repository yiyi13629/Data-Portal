/* 数据门户 · Mock 数据（沿用原型示例 + PRD 指标） */
window.DATA = (function () {
  // 业务主题（数据中台板块）
  const THEMES = ['方特支付', '方特旅游', '方特动漫', '设计院', '商业系统', '人力资源'];

  // 顶部门户统计（PRD F2 指标）
  const PORTAL_STATS = [
    { label: '业务主题', value: '30', desc: '数据中台板块数量' },
    { label: '数据资产', value: '360K', desc: '资产超市总量' },
    { label: '数据集', value: '1,500', desc: 'BI 已发布数据集' },
    { label: '数据指标', value: '5,600', desc: '已定义指标数' },
    { label: '数据看板', value: '2,600', desc: 'BI 已发布看板' },
  ];

  // ---- 数据资产（表）----
  const ASSETS = [
    { id:'a1', name:'用户行为分析表', en:'dw_user_behavior', type:'表', theme:'商业系统', tone:'brand', hot:true, fav:true,
      desc:'记录用户在平台上的全量行为数据，覆盖点击、浏览、搜索、加购等事件，按日分区存储，支撑用户画像、漏斗分析与个性化推荐等场景', owner:'张三', date:'2026-06-03', fields:24, views:3256, stars:128, perm:'读', mine:true },
    { id:'a2', name:'销售订单明细表', en:'dw_sales_order_detail', type:'表', theme:'商业系统', tone:'green', hot:true, fav:false,
      desc:'全量销售订单明细，含订单状态、支付金额与商品渠道信息', owner:'李四', date:'2026-06-03', fields:36, views:2890, stars:96, perm:'读', mine:true },
    { id:'a3', name:'财务报表汇总', en:'dws_finance_report', type:'表', theme:'商业系统', tone:'purple', hot:true, fav:false,
      desc:'月度财务核心指标汇总表', owner:'赵六', date:'2026-06-02', fields:42, views:1560, stars:88, perm:'读', mine:true },
    { id:'a4', name:'实时数据流', en:'rt_data_stream', type:'表', theme:'设计院', tone:'cyan', hot:false, fav:false,
      desc:'实时数据采集与处理管道，覆盖埋点上报与设备上送，秒级写入', owner:'吴九', date:'2026-05-30', fields:18, views:756, stars:38, perm:'读' },
    { id:'a5', name:'公园客流数据', en:'dwd_park_traffic', type:'表', theme:'方特旅游', tone:'amber', hot:false, fav:true,
      desc:'各公园实时客流、排队时长与游客画像综合数据，融合闸机、APP 与 Wi-Fi 多源采集，支撑客流预警与运营调度决策', owner:'郑十', date:'2026-06-03', fields:56, views:4120, stars:198, perm:'读', mine:true },
    { id:'a6', name:'设备运行状态', en:'dwd_device_status', type:'表', theme:'方特旅游', tone:'cyan', hot:false, fav:false,
      desc:'游乐设施运行与故障维护记录', owner:'赵六', date:'2026-06-01', fields:28, views:3120, stars:156, perm:'读' },
    { id:'a7', name:'供应链库存表', en:'dwd_supply_inventory', type:'表', theme:'商业系统', tone:'brand', hot:false, fav:false,
      desc:'物资库存、采购订单与供应商信息汇总，覆盖出入库与在途状态', owner:'周八', date:'2026-05-31', fields:32, views:1890, stars:89, perm:'读', mine:true },
    { id:'a8', name:'会员画像宽表', en:'dws_member_profile', type:'表', theme:'方特支付', tone:'green', hot:true, fav:false,
      desc:'会员标签、消费偏好与生命周期阶段综合画像，整合交易、互动与权益数据，服务于精准营销、会员运营与流失预警', owner:'孙七', date:'2026-05-29', fields:64, views:2670, stars:142, perm:'读', mine:true },
    { id:'a9', name:'门票核销明细', en:'dwd_ticket_check', type:'表', theme:'方特旅游', tone:'purple', hot:false, fav:false,
      desc:'各园区门票核销与入园记录明细，含票种、闸口与时段信息', owner:'郑十', date:'2026-05-28', fields:22, views:1340, stars:67, perm:'读' },
    { id:'a10', name:'二销消费流水', en:'dwd_secondary_sales', type:'表', theme:'方特旅游', tone:'amber', hot:true, fav:false,
      desc:'园区内餐饮、零售、游乐二次消费流水明细，关联门票与会员身份，支撑二销转化与坪效分析', owner:'李四', date:'2026-06-02', fields:30, views:2340, stars:131, perm:'读', mine:true },
    { id:'a11', name:'员工考勤记录', en:'dwd_attendance', type:'表', theme:'人力资源', tone:'cyan', hot:false, fav:false,
      desc:'全员打卡、请假、加班与排班考勤明细，按部门与日期分区', owner:'孙七', date:'2026-06-01', fields:20, views:1120, stars:54, perm:'读', mine:true },
    { id:'a12', name:'薪酬绩效表', en:'dws_salary_perf', type:'表', theme:'人力资源', tone:'purple', hot:false, fav:false,
      desc:'按月汇总的薪酬结构与绩效评分宽表，含职级、调薪与考核结果，服务人效与成本分析', owner:'周八', date:'2026-05-27', fields:38, views:980, stars:47, perm:'读' },
    { id:'a13', name:'渠道投放明细', en:'dwd_channel_delivery', type:'表', theme:'商业系统', tone:'red', hot:true, fav:false,
      desc:'各营销渠道投放计划、曝光与转化明细，支撑投放 ROI 与归因分析', owner:'王五', date:'2026-06-02', fields:34, views:2780, stars:148, perm:'读', mine:true },
    { id:'a14', name:'资金流水台账', en:'dwd_cash_flow', type:'表', theme:'方特支付', tone:'green', hot:false, fav:false,
      desc:'集团资金收支与账户余额流水台账，覆盖支付、退款与结算全链路', owner:'赵六', date:'2026-05-30', fields:26, views:1670, stars:79, perm:'读', mine:true },
    { id:'a15', name:'物业租赁合同', en:'dwd_property_lease', type:'表', theme:'设计院', tone:'brand', hot:false, fav:false,
      desc:'物业商铺租赁合同与租金账单明细，含租期、租金与缴费状态', owner:'吴九', date:'2026-05-26', fields:24, views:860, stars:41, perm:'读' },
    { id:'a16', name:'能耗监测数据', en:'dwd_energy_monitor', type:'表', theme:'方特旅游', tone:'cyan', hot:false, fav:true,
      desc:'园区水电气能耗实时监测明细，按设备与区域聚合，支撑节能调度与碳排核算', owner:'郑十', date:'2026-06-01', fields:29, views:1450, stars:73, perm:'读' },
    { id:'a17', name:'营销活动效果', en:'dws_campaign_effect', type:'表', theme:'商业系统', tone:'red', hot:true, fav:false,
      desc:'各营销活动曝光、参与与转化效果汇总，关联渠道与人群，支撑活动复盘与 ROI 评估', owner:'王五', date:'2026-06-02', fields:33, views:2450, stars:121, perm:'读', mine:true },
    { id:'a18', name:'应收应付明细', en:'dwd_ar_ap_detail', type:'表', theme:'方特支付', tone:'green', hot:false, fav:false,
      desc:'企业应收应付账款明细，含账期、对账与核销状态', owner:'赵六', date:'2026-05-29', fields:31, views:1280, stars:62, perm:'读', mine:true },
    { id:'a19', name:'客诉工单记录', en:'dwd_complaint_ticket', type:'表', theme:'方特旅游', tone:'amber', hot:false, fav:false,
      desc:'游客投诉与服务工单全流程记录，含分类、处理时效与满意度回访', owner:'郑十', date:'2026-05-31', fields:26, views:980, stars:44, perm:'读' },
    { id:'a20', name:'设备维保计划', en:'dwd_device_maintain', type:'表', theme:'方特旅游', tone:'cyan', hot:false, fav:false,
      desc:'游乐设施巡检与维保计划台账，含周期、责任人与执行状态', owner:'赵六', date:'2026-05-28', fields:23, views:760, stars:35, perm:'读' },
    { id:'a21', name:'商品主数据', en:'dim_product_master', type:'表', theme:'商业系统', tone:'brand', hot:false, fav:false,
      desc:'统一商品主数据，覆盖品类、规格、价格与上下架状态，服务多业务系统取数', owner:'李四', date:'2026-05-30', fields:40, views:2010, stars:96, perm:'读', mine:true },
    { id:'a22', name:'门店经营日报', en:'dws_store_daily', type:'表', theme:'商业系统', tone:'purple', hot:true, fav:false,
      desc:'各门店每日营收、客流与坪效经营日报，支撑门店运营与对标分析', owner:'王五', date:'2026-06-02', fields:35, views:2680, stars:138, perm:'读', mine:true },
    { id:'a23', name:'停车场流水', en:'dwd_parking_flow', type:'表', theme:'方特旅游', tone:'brand', hot:false, fav:false,
      desc:'各园区停车场进出场与缴费流水明细，含车牌、时长与费用', owner:'郑十', date:'2026-05-27', fields:21, views:840, stars:39, perm:'读' },
    { id:'a24', name:'餐饮档口销售', en:'dwd_catering_sales', type:'表', theme:'方特旅游', tone:'amber', hot:false, fav:false,
      desc:'园区餐饮档口商品销售流水，关联档口、品类与时段，支撑餐饮选品与排班', owner:'李四', date:'2026-05-29', fields:28, views:1190, stars:57, perm:'读', mine:true },
    { id:'a25', name:'用户标签画像', en:'dws_user_tag_profile', type:'表', theme:'方特支付', tone:'green', hot:true, fav:false,
      desc:'用户多维标签与画像宽表，整合消费、互动与偏好，支撑精准营销与人群圈选', owner:'孙七', date:'2026-06-01', fields:58, views:2890, stars:151, perm:'读', mine:true },
    { id:'a26', name:'库存周转分析', en:'dws_inventory_turnover', type:'表', theme:'商业系统', tone:'cyan', hot:false, fav:false,
      desc:'商品库存周转与呆滞分析汇总，支撑补货与库存健康度监控', owner:'周八', date:'2026-05-26', fields:30, views:1120, stars:53, perm:'读' },
    { id:'a27', name:'营收预测模型', en:'app_revenue_forecast', type:'表', theme:'商业系统', tone:'brand', hot:false, fav:false,
      desc:'基于历史经营数据的营收预测结果表，按业务线与周期输出预测与置信区间', owner:'张三', date:'2026-05-30', fields:24, views:1560, stars:78, perm:'读' },
    { id:'a28', name:'客户满意度调查', en:'dwd_csat_survey', type:'表', theme:'设计院', tone:'purple', hot:false, fav:false,
      desc:'客户满意度问卷与评分明细，含触点、维度与开放反馈', owner:'吴九', date:'2026-05-25', fields:19, views:680, stars:31, perm:'读' },
    { id:'a29', name:'广告投放 ROI', en:'dws_ad_roi', type:'表', theme:'方特动漫', tone:'red', hot:true, fav:false,
      desc:'广告投放成本、转化与 ROI 汇总，多平台归因，支撑预算分配与优化', owner:'王五', date:'2026-06-01', fields:32, views:2230, stars:114, perm:'读', mine:true },
    { id:'a30', name:'内容版权台账', en:'dwd_content_copyright', type:'表', theme:'方特动漫', tone:'purple', hot:false, fav:false,
      desc:'动漫内容版权与授权台账，含授权范围、期限与结算信息', owner:'张三', date:'2026-05-24', fields:27, views:910, stars:42, perm:'读' },
  ];

  // ---- 数据看板（按业务主题→子目录分组）----
  const BOARD_CATS = ['经营分析', '财务分析', '运营分析', '人力分析', '营销分析'];
  const BOARDS = {
    '经营分析': {
      '集团分析': [
        { name:'集团概况', tone:'brand', owner:'孙七', views:5680, stars:324, date:'2026-06-01', hot:true, mine:true, desc:'集团整体经营全景，营收、利润、资产等核心指标一屏总览。' },
        { name:'物业资产经营', tone:'green', owner:'周八', views:4230, stars:245, date:'2026-05-31', hot:true, mine:false, desc:'物业资产出租率、租金回款与资产收益的经营分析。' },
        { name:'产业金融', tone:'cyan', owner:'张三', views:3150, stars:189, date:'2026-05-30', hot:true, mine:true, desc:'产业金融板块放款规模、风险敞口与收益结构监控。' },
        { name:'新能源', tone:'green', owner:'吴九', views:2890, stars:167, date:'2026-05-29', hot:false, mine:false, desc:'新能源业务装机量、发电量与并网收益跟踪分析。' },
        { name:'其他业务', tone:'purple', owner:'郑十', views:1980, stars:112, date:'2026-05-28', hot:false, mine:false, desc:'集团其他业务板块收入构成与经营效率概览。' },
      ],
      '文化科技': [
        { name:'总体概况', tone:'purple', owner:'郑十', views:3200, stars:189, date:'2026-06-02', hot:true, mine:true, desc:'文化科技板块整体经营情况与重点项目进展概览。' },
        { name:'主题公园经营', tone:'brand', owner:'李四', views:2890, stars:167, date:'2026-06-01', hot:true, mine:true, desc:'主题公园客流、二销与营收的综合经营看板。' },
        { name:'数字动漫', tone:'red', owner:'张三', views:2100, stars:123, date:'2026-05-31', hot:true, mine:true, desc:'数字动漫内容产出、播放与衍生收入分析。' },
        { name:'创意设计', tone:'amber', owner:'王五', views:1890, stars:98, date:'2026-05-30', hot:false, mine:false, desc:'创意设计业务接单、产能与项目利润分析。' },
        { name:'特种电影', tone:'red', owner:'赵六', views:1780, stars:89, date:'2026-05-29', hot:false, mine:false, desc:'特种电影排片、票房与放映效益分析。' },
      ],
      '电子信息': [
        { name:'总体概况', tone:'cyan', owner:'张三', views:2800, stars:167, date:'2026-06-03', hot:true, mine:true, desc:'电子信息板块营收、订单与产能利用率总览。' },
        { name:'半导体集团', tone:'brand', owner:'李四', views:2340, stars:134, date:'2026-06-02', hot:true, mine:true, desc:'半导体业务产线良率、产能与出货分析。' },
        { name:'电子网集团', tone:'purple', owner:'王五', views:2100, stars:112, date:'2026-06-01', hot:false, mine:false, desc:'电子网业务流量、交易与营收结构分析。' },
        { name:'电子世界', tone:'purple', owner:'赵六', views:1890, stars:98, date:'2026-05-31', hot:false, mine:false, desc:'电子世界门店销售、库存与坪效经营分析。' },
      ],
      '产业地产': [
        { name:'总体概况', tone:'amber', owner:'周八', views:2600, stars:156, date:'2026-06-03', hot:true, mine:false, desc:'产业地产开发、招商与运营的整体经营概览。' },
        { name:'地产开发', tone:'red', owner:'吴九', views:2230, stars:134, date:'2026-06-02', hot:true, mine:false, desc:'地产项目开发进度、去化与回款分析。' },
        { name:'物业管理', tone:'red', owner:'张三', views:1980, stars:112, date:'2026-06-01', hot:false, mine:true, desc:'物业管理服务覆盖、收缴率与成本分析。' },
      ],
    },
    '财务分析': {
      '资金分析': [
        { name:'现金流监控', tone:'cyan', owner:'周八', views:1980, stars:104, date:'2026-06-02', hot:false, mine:true, desc:'集团现金流入流出、资金余额实时监控。' },
        { name:'应收应付', tone:'purple', owner:'王五', views:1450, stars:76, date:'2026-05-29', hot:false, mine:false, desc:'应收应付账龄、周转与风险预警分析。' },
      ],
      '财务报表': [
        { name:'集团收入总览', tone:'brand', owner:'李四', views:3400, stars:201, date:'2026-06-03', hot:true, mine:true, desc:'集团各板块收入规模、增速与结构对比分析。' },
        { name:'分子公司利润', tone:'green', owner:'赵六', views:2100, stars:120, date:'2026-06-01', hot:false, mine:false, desc:'各分子公司利润贡献与盈利能力对比。' },
      ],
      '财务分析': [
        { name:'成本费用分析', tone:'amber', owner:'孙七', views:1760, stars:88, date:'2026-05-30', hot:false, mine:true, desc:'集团成本费用构成、同比变化与管控分析。' },
      ],
      '物业管理': [
        { name:'物业财务概览', tone:'green', owner:'周八', views:1320, stars:71, date:'2026-05-27', hot:false, mine:false, desc:'物业板块收缴、成本与利润的财务分析。' },
      ],
      '酒店管理': [
        { name:'酒店营收分析', tone:'amber', owner:'赵六', views:1180, stars:63, date:'2026-05-26', hot:false, mine:false, desc:'酒店入住率、RevPAR 与营收结构分析。' },
      ],
    },
    '运营分析': {
      '园区运营': [
        { name:'实时客流大屏', tone:'brand', owner:'郑十', views:5120, stars:289, date:'2026-06-03', hot:true, mine:true, desc:'园区实时客流、入园趋势与承载预警大屏。' },
        { name:'入园转化漏斗', tone:'green', owner:'张三', views:2680, stars:143, date:'2026-06-01', hot:true, mine:false, desc:'从曝光到入园的转化漏斗与流失分析。' },
      ],
      '票务分析': [
        { name:'票务销售分析', tone:'cyan', owner:'李四', views:2240, stars:121, date:'2026-05-31', hot:false, mine:true, desc:'各渠道票种销量、价格与退改情况分析。' },
      ],
      '酒店运营': [
        { name:'二销转化', tone:'amber', owner:'李四', views:1890, stars:97, date:'2026-05-30', hot:false, mine:false, desc:'园区二次消费转化率与客单价分析。' },
      ],
    },
    '人力分析': {
      '员工管理': [
        { name:'人员编制总览', tone:'cyan', owner:'孙七', views:1670, stars:82, date:'2026-06-02', hot:false, mine:true, desc:'集团人员编制、在岗与缺编情况总览。' },
        { name:'人效与成本', tone:'purple', owner:'周八', views:1240, stars:64, date:'2026-05-28', hot:false, mine:false, desc:'人均产值、人工成本占比与人效趋势分析。' },
      ],
      '考勤分析': [
        { name:'考勤出勤分析', tone:'brand', owner:'王五', views:980, stars:52, date:'2026-05-25', hot:false, mine:true, desc:'各部门出勤率、加班与异常考勤分析。' },
      ],
    },
    '营销分析': {
      '活动效果': [
        { name:'营销活动看板', tone:'red', owner:'王五', views:2980, stars:176, date:'2026-06-03', hot:true, mine:true, desc:'营销活动投入产出、转化与 ROI 效果跟踪。' },
        { name:'渠道投放 ROI', tone:'brand', owner:'李四', views:2140, stars:118, date:'2026-06-01', hot:false, mine:false, desc:'各渠道投放成本、获客与 ROI 对比分析。' },
      ],
      '会员分析': [
        { name:'会员增长分析', tone:'green', owner:'张三', views:1760, stars:94, date:'2026-05-30', hot:false, mine:true, desc:'会员新增、活跃与留存的增长分析。' },
      ],
      '竞品分析': [
        { name:'竞品对标分析', tone:'purple', owner:'赵六', views:1280, stars:67, date:'2026-05-28', hot:false, mine:false, desc:'主要竞品价格、客流与口碑的对标分析。' },
      ],
    },
  };

  // ---- 数据分析（工具广场）----
  const TOOL_GROUPS = [
    { cat:'数据分析与可视化', tone:'red', tools:[
      { name:'数据准备', icon:'prep', desc:'数据清洗、转换、关联等预处理', go:true },
      { name:'数据集', icon:'dataset', desc:'创建和管理分析数据集', go:true },
      { name:'数据看板', icon:'board', desc:'拖拽式构建精美数据可视化看板', go:true, tag:'常用' },
    ]},
    { cat:'数据资产与服务', tone:'amber', tools:[
      { name:'数据目录管理', icon:'folder', desc:'企业级数据目录，方便查找和理解数据', go:true },
      { name:'数据资产注册', icon:'plus', desc:'注册和发布数据资产，促进数据共享', go:true },
      { name:'数据资产超市', icon:'cart', desc:'像购物一样浏览和申请数据资产', go:true, tag:'热门' },
      { name:'数据服务', icon:'cloud', desc:'数据 API 服务，快速对外提供数据', go:true },
    ]},
    { cat:'数据治理与安全', tone:'green', tools:[
      { name:'元数据管理', icon:'meta', desc:'采集、管理和查询数据血缘及元数据', go:true },
      { name:'数据标准管理', icon:'gear', desc:'统一口径，规范数据标准', go:false },
      { name:'数据质量管理', icon:'check', desc:'监控与提升数据质量', go:false, tag:'常用' },
      { name:'主数据管理', icon:'user', desc:'统一管理核心主数据', go:false },
      { name:'数据安全', icon:'shield', desc:'分级分类与脱敏保护', go:false, tag:'新' },
    ]},
    { cat:'数据建模', tone:'purple', tools:[
      { name:'数据域管理', icon:'domain', desc:'按业务域组织建模资产', go:false },
      { name:'维度管理', icon:'cube', desc:'统一维度与一致性维度', go:false },
      { name:'数据建模', icon:'model', desc:'可视化构建数据模型', go:false },
      { name:'即席查询', icon:'query', desc:'交互式 SQL 即席分析', go:false },
    ]},
    { cat:'数据集成', tone:'cyan', tools:[
      { name:'数据源接入', icon:'plug', desc:'多源异构数据接入', go:false },
      { name:'数据导入', icon:'upload', desc:'批量导入本地与外部数据', go:false },
      { name:'API 导入', icon:'api', desc:'通过 API 拉取数据', go:false },
    ]},
    { cat:'帮助中心', tone:'slate', tools:[
      { name:'快速入门', icon:'rocket', desc:'5 分钟上手数据门户', go:false },
      { name:'操作文档', icon:'doc', desc:'各模块操作手册', go:false },
      { name:'视频教程', icon:'video', desc:'功能演示视频', go:false },
      { name:'常见问题', icon:'help', desc:'FAQ 与问题排查', go:false },
    ]},
  ];

  // ---- 表详情：字段 ----
  const FIELDS = [
    { name:'user_id', type:'bigint', pk:true, note:'用户唯一标识ID', alias:'用户ID', sample:'10001', biz:'用户系统生成的全局唯一编号', syn:'用户标识', map:'-', level:'L1-公开' },
    { name:'user_name', type:'string', pk:false, note:'用户姓名', alias:'用户姓名', sample:'张三', biz:'用户注册时填写的姓名', syn:'姓名', map:'-', level:'L1-公开' },
    { name:'phone', type:'string', pk:false, note:'手机号码', alias:'手机号', sample:'138****8888', biz:'用户绑定的手机号码', syn:'联系电话', map:'-', level:'L3-敏感' },
    { name:'email', type:'string', pk:false, note:'邮箱地址', alias:'邮箱', sample:'zhangsan@example.com', biz:'用户注册邮箱', syn:'电子邮箱', map:'-', level:'L3-敏感' },
    { name:'register_time', type:'datetime', pk:false, note:'注册时间', alias:'注册时间', sample:'2024-01-15 10:30:00', biz:'用户完成注册的时间', syn:'注册日期', map:'-', level:'L1-公开' },
    { name:'status', type:'int', pk:false, note:'用户状态', alias:'状态', sample:'1', biz:'1-正常 0-禁用', syn:'用户状态', map:'-', level:'L1-公开' },
    { name:'level', type:'string', pk:false, note:'会员等级', alias:'会员等级', sample:'VIP', biz:'用户会员等级', syn:'等级', map:'会员等级指标', level:'L2-内部' },
    { name:'total_consume', type:'decimal', pk:false, note:'累计消费金额', alias:'累计消费', sample:'12880.50', biz:'用户累计消费总额', syn:'消费总额', map:'消费指标', level:'L3-敏感' },
  ];
  const PART_FIELDS = [
    { name:'ds', type:'string', note:'分区日期，格式 yyyy-MM-dd', alias:'分区日期', sample:'2024-01-15', biz:'按日期分区', syn:'日期分区', map:'-', level:'L1-公开' },
  ];

  const HISTORY = ['财务', '人力', '绩效', '公园', '客流'];

  // 目录树：完整表清单（填满侧栏）
  const CATALOG = [
    '用户行为分析表','销售订单明细表','财务报表汇总','实时数据流','公园客流数据','设备运行状态',
    '供应链库存表','会员画像宽表','门票核销明细','二销消费流水','员工考勤记录','薪酬绩效表',
    '营销活动效果','渠道投放明细','资金流水台账','应收应付明细','物业租赁合同','能耗监测数据',
    '客诉工单记录','设备维保计划','商品主数据','门店经营日报','停车场流水','餐饮档口销售',
    '用户标签画像表','库存周转分析','营收预测模型','客户满意度调查','广告投放ROI','内容版权台账',
    '分销渠道明细','积分权益记录','退款售后明细','优惠券核销','直播带货流水','商品评价数据',
    '物流配送明细','员工培训记录','招聘需求台账','差旅报销明细','固定资产台账','预算执行明细',
    '合同管理台账','发票开具记录'
  ];

  return { THEMES, PORTAL_STATS, ASSETS, BOARD_CATS, BOARDS, TOOL_GROUPS, FIELDS, PART_FIELDS, HISTORY, CATALOG };
})();
