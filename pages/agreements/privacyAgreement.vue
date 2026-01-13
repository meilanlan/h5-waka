<template>
  <view class="wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="Whack隐私政策" @backPage="backPage" />
    <!-- <view class="title">Whack隐私政策</view> -->
    <view class="text-indent mt32">2025年12月18日更新</view>
    <view class="text-indent">欢迎您选择由上海格乐喜网络信息科技有限公司（以下简称“本公司”或“我们”）为您提供的网络服务，我们特此制定本《Whack隐私政策》（以下简称“本政策”），以便您了解我们如何收集、存储、使用、共享、转让、公开披露、删除您的个人信息，以及您所享有的相关权利等事宜。我们非常重视您的个人信息保护并充分尊重您的用户权利，请您仔细阅读本政策，并按照本政策的指引做出您认为适当的选择。<span class="font-bold">在使用我们的产品及服务前，请您务必仔细阅读本政策，特别是以粗体标识的条款，您应重点阅读，在充分理解本政策并同意后再开始使用我们的产品及服务。如您不同意本政策的任何内容，您应立即停止使用我们的产品及服务。</span></view>
    <view>本政策为《Whack用户协议》的组成部分，本政策中未约定的事宜，适用《Whack用户协议》的约定。</view>
    <view><span class="font-bold">目录</span></view>
    <view>1.我们如何收集和使用您的个人信息</view>
    <view>2.我们如何使用Cookie和同类技术</view>
    <view>3.我们如何存储个人信息</view>
    <view>4.我们如何保护您的个人信息</view>
    <view>5.我们如何共享、转让、公开披露您的个人信息</view>
    <view>6.您的权利</view>
    <view>7.有关未成年人使用服务的提示</view>
    <view>8.本政策的适用范围及变更</view>
    <view>9.联系方式</view>
    <view><span class="font-bold">摘要</span></view>
    <view>本摘要主要向您说明我们如何收集、处理您的个人信息以及您享有的个人信息权利，如您想详细了解您的个人信息处理情况，以及我们处理您个人信息的而全部规则，请您阅读完整版《Whack用户协议》。</view>
    <view class="font-bold">一、我们如何收集和使用您的个人信息</view>
    <view>为提供基本功能服务，我们需要收集以下信息：</view>
    <view>为提供注册、登录功能，我们将获取您的手机号码及短信验证码，或第三方账号公开信息（头像、昵称、身份验证信息以及您授权的相关信息）。</view>
    <view>为保障账户安全，防止用户账号变动后用户账号数据丢失，保障软件正常运行，并对您使用我们服务的情况进行统计和分析，我们会收集移动设备的设备品牌、设备型号、设备版本、设备配置（包括内存）、设备平台、设备语言、手机运营商、设备<span class="font-bold">MAC</span>地址、<span class="font-bold">SSID</span>、<span class="font-bold">AndroidID</span>（安卓系统）、<span class="font-bold">UUID</span>、<span class="font-bold">IDFA</span>（iOS系统）、<span class="font-bold">OAID</span>、<span class="font-bold">WIFI_NAME</span>，<span class="font-bold">APP_LIST</span>、系统应用进程（安卓系统）、剪贴板信息、运行中进程信息、应用安装列表、Internet网络权限（鸿蒙系统）、允许应用获取数据网络信息权限（鸿蒙系统）、允许应用控制振动权限（鸿蒙系统）、允许应用访问通知权限（鸿蒙系统）。</view>
    <view>为保存历史记录和服务分析，我们会收集日志信息，搜索、<span class="font-bold">浏览信息及点击记录</span>、访问的社交媒体页面URL地址。</view>
    <view>对于扩展业务功能所需信息，我们将根据您的授权进行收集和使用。</view>
    <view class="font-bold">二、我们如何共享您的个人信息</view>
    <view>为保障我们的产品相关功能的实现及安全稳定运行，部分服务会由第三方提供，因此我们需要在您使用对应功能时向第三方共享您的个人信息，在使用第三方共享信息时APP内会弹窗获取您的确认。</view>
    <view class="font-bold">三、您如何管理您的个人信息</view>
    <view>您可以通过多种方式自行管理您的个人信息，包括查询、更新账号中的个人基本资料信息，改变您授权同意的范围，注销您的账户，如您无法通过上述方式管理您的个人信息或您在管理个人信息过程中遇到问题，您可以与我们联系。</view>
    <view class="font-bold">四、未成年人信息保护</view>
    <view>我们高度重视未成年人的保护工作，如您是未成年人或其监护人，请仔细阅读本政策第8章中有关未成年人的规定，对于经监护人同意而收集未成年人个人信息的情况，我们只会在受到法律允许、监护人明确同意或者保护未成年人所必要的情况下使用或公开披露此信息。</view>
    <view class="font-bold">五、如何联系我们</view>
    <view>若您对本政策或与您个人信息相关的事宜有任何问题、意见或建议，可以通过发送邮件gelexiwork@163.com与我们联系。</view>
    <view>1.我们如何收集和使用您的个人信息</view>
    <view>根据《常见类型移动互联网应用程序必要个人信息范围规定》，本产品属于网络社区类APP，基本业务功能为博客、论坛、社区等话题讨论、信息分享和关注互动，需要提供手机号码，即可使用基本功能服务。</view>
    <view>1.1 您须授权我们收集和使用您个人信息的情形</view>
    <view>为了向您提供本公司产品及服务的核心功能，我们会收集、使用下列个人信息，如果您拒绝提供相关信息，您将无法享受本公司产品或服务的基本业务功能，这些功能包括：</view>
    <view>1.1.1注册登录</view>
    <view>· 当您使用账号注册或登录功能时，您可能会在注册或登录时主动向我们提供您的个人基本资料，包括手机号码及短信验证码，述信息为必要个人信息，如您拒绝提供，您可能无法通过注册或登录从而使用本产品或服务。</view>
    <view>· 如您通过苹果应用商店、各大安卓应用商店下载或购买本公司产品或服务时，我们从该等应用商店处获取的您的信息，可能包括您的手机号码、账户信息，上述信息为必要个人信息，如您拒绝提供，您可能无法通过该等第三方下载或购买本产品或服务。</view>
    <view>· 如您授权以第三方账号，包括微博、微信、QQ或各手机品牌用户账号登录使用我们的服务时，我们将获取您授权共享的该第三方账号下的相关信息，包括头像、昵称，以及身份验证信息，具体以您授权内容为准，并将您的第三方账号与我们的服务账号进行绑定，以便您可以通过第三方账号直接登录并使用我们的服务，如您拒绝授权此类信息的，您将无法使用第三方账号登录使用本产品或服务，但不影响您通过其他方式登录使用本产品或服务。</view>
    <view>· 为了完善您的账号资料，您可能会在注册时主动向我们提供额外个人基本资料，包括昵称、头像、性别。</view>
    <view>· 为判断您是否安装微信以帮助您通过微信登录使用本软件并使用微信分享功能，我们会获取您设备的已安装程序列表。</view>
    <view>· 当您登录使用本软件时，我们会读取您的剪贴板内容以判断是否有相关邀请码信息，以帮助您进入相应社区，仅当剪贴码有前述邀请码信息时，我们才会收集该邀请码以向您提供本软件服务，我们不会存储您的剪贴板其他信息，且单独的剪贴板信息无法识别您的特定身份。</view>
    <view>· 为了实现一键登录功能，我们需要获取安卓系统的电话权限，以读取本机电话号码，获取您的手机号码。您拒绝提供仅会使您无法通过手机号码一键登录，但不影响您通过其他方式登录使用本产品或服务。</view>
    <view>1.1.2 保障软件正常运行及运营安全</view>
    <view>· 为保障您的账户安全，防止用户账号变动后用户账号数据丢失，保障软件正常运行，并对您使用我们服务的情况进行统计和分析，我们会收集与移动设备相关的信息，包括：设备基本信息（设备品牌、型号、操作系统版本、语言、系统配置、内存、手机运营商、设备平台，设备标识信息（安卓设备：<span class="font-bold">Android ID</span>、<span class="font-bold">OAID</span>，<span class="font-bold">iOS</span>设备：<span class="font-bold">IDFA</span>、<span class="font-bold">IDFV</span>、<span class="font-bold">GAID</span>，鸿蒙设备：<span class="font-bold">OAID</span>，通用标识：<span class="font-bold">UUID</span>、<span class="font-bold">MAC</span>地址），网络与系统信息（<span class="font-bold">SSID</span>、<span class="font-bold">WiFi</span>名称<span class="font-bold">WIFI_NAME</span>、 系统应用进程、运行中进程、已安装应用列表<span class="font-bold">APP_LIST</span>），系统权限（鸿蒙系统：<span class="font-bold">Internet</span>网络权限、允许应用获取数据网络信息权限、允许应用控制振动权限、允许应用访问通知权限），剪贴板信息。</view>
    <view>· 为了您能够在客户端查看您的历史记录，同时用于我们的运营统计分析、客户投诉处理及服务体验分析，我们会收集您的日志信息，包括登录日志，创建或加入社区记录，您使用本软件时搜索、<span class="font-bold">浏览的信息及点击记录</span>、访问的社交媒体页面URL地址，以及您在使用本软件时浏览或要求提供的其他信息和内容详情。其中<span class="font-bold">浏览点击记录属于个人敏感信息</span>，收集上述信息为保留您的历史记录所必须，如您拒绝提供，您将无法在客户端查看您的历史记录。</view>
    <view>1.2 您可选择是否授权我们收集和使用您个人信息的情形</view>
    <view>如您使用了本公司产品及服务的其他业务功能，我们会收集、使用下列个人信息，以为您提供本公司产品或服务的扩展业务功能：</view>
    <view>1.2.1 身份认证</view>
    <view>· 为满足相关法律法规政策及相关主管部门的要求，您在使用部分功能时需进行实名认证，我们会在您选择使用该部分功能时向你进行提示。如您选择使用该部分功能，我们会在获得您同意或您主动提供的情况下收集您的个人基本资料及个人身份信息，包括您的姓名、<span class="font-bold">身份证号</span>。而且，当您创建社区时，我们还需要调用您的相机权限，以使用设备摄像头获取您的<span class="font-bold">面部识别特征</span>，并与您的个人身份信息进行核对，以提高实名认证的精准度，最大限度防止身份冒用。<span class="font-bold">其中，个人身份信息、面部识别特征属于个人敏感信息</span>，如您拒绝提供可能会导致您无法使用该部分功能，或在使用本软件过程中受到相应的限制。为实现实名认证的目的，您同意我们可以自行或委托第三方向有关机构提供、查询、核对您的前述个人信息。</view>
    <view>1.2.2 信息浏览、发布与互动</view>
    <view>· 当您使用本软件的信息浏览、制作、发布以及分享、交流互动功能，包括浏览/发布/回复话题、分享、收藏、打赏时，我们需收集您发布的文字、图片、视频信息，并使用您的昵称、头像和发布内容以作展示，以便为您提供社交功能并保存相应历史记录，或收集已安装应用列表，以帮助您将本产品内容分享至其他应用。请您注意，<span class="font-bold">您在公开区域上传或发布的信息可能会被他人收集并加以使用，且这些信息中可能包括个人敏感信息，为保障您的人身和财产安全，请您谨慎提供。如您不同意我们收集上述信息，您将无法使用本软件的社交功能，但不影响您使用本软件的基本业务功能</span>。</view>
    <view>· 在您使用该业务功能时，为了上传、下载、发送图片、视频、文件，我们需要获取安卓系统的存储权限，以读取和写入外置存储器，获取相关图片、视频、文件，或需要获取iOS系统的照片权限，以读取和写入用户照片库，获取照片、视频，或需要鸿蒙系统的允许应用读写用户外部存储中的媒体文件信息权限、允许修改用户公共目录的图片或视频文件权限，以保存、备份或同步图片、视频类文件，<span class="font-bold">这些信息中可能包括个人敏感信息，为保障您的人身和财产安全，请您谨慎提供。如您拒绝提供仅会使您无法使用相应功能，但不影响您使用本软件的基本功能</span>。</view>
    <view>· 当您使用拍摄照片、视频，扫描二维码功能时，我们需要获取相机权限，以使用设备摄像头获取您拍摄的照片、视频信息。这些信息中可能包括个人敏感信息，为保障您的人身和财产安全，请您谨慎提供。如您拒绝提供仅会使您无法使用相应功能，但不影响您使用本软件的基本业务功能。</view>
    <view>· 当您使用语音功能时，我们需要获取麦克风权限，以使用麦克风获取您的语音数据。<span class="font-bold">这些信息中可能包括个人敏感信息，为保障您的人身和财产安全，请您谨慎提供</span>。如您拒绝提供仅会使您无法使用相应功能，但不影响您使用本软件的基本业务功能。</view>
    <view>· 当您在本软件浏览信息时，为了能根据您的设备方向自动旋转设备屏幕，以使您能以竖排或横排模式查看本软件内容，我们需要获取设备重力传感器信息、加速度传感器信息。</view>
    <view>· 当您在本软件浏览信息时，为了允许本软件在其他程序上覆盖显示，我们需要获取安卓系统的悬浮窗权限，以实现小窗体、悬浮、桌面显示功能。如您拒绝提供仅会使您无法使用相应功能，但不影响您使用本软件的基本业务功能。</view>
    <view>1.2.3 消费与支付</view>
    <view>· 当您使用支付或提现功能时，我们会收集您的支付信息、<span class="font-bold">充值记录、消费记录</span>，以便完成支付或提现功能并保存您的交易记录，同时尽最大程度保护您的财产安全，并在交易出现争议时为客服人员提供前述信息作为争议解决的依据。请您注意，<span class="font-bold">充值记录、消费记录属于个人敏感信息</span>，收集上述信息为实现本软件中消费功能所必须，如您不提供，您将无法完成交易，但不影响您使用本软件基本业务功能。</view>
    <view>· 当您使用红包功能时，您需要绑定支付宝账号并完成支付。我们会获取您的支付宝账号信息，包括昵称、头像、UserID、地区、性别、<span class="font-bold">身份证信息</span>，且您的交易相对方可以查看您的支付宝昵称、头像，<span class="font-bold">个人身份信息属于个人敏感信息，请您谨慎提供</span>，如您拒绝提供可能会导致您无法使用该部分功能，但不会影响您使用本软件的基本业务功能。</view>
    <view>· 当您使用提现功能时，您需要提供您的<span class="font-bold">银行卡信息</span>、姓名、<span class="font-bold">身份证号</span>、银行预留手机号，以便我们将前述信息与发卡银行进行验证并帮助您完成账户余额提现。<span class="font-bold">银行账号信息、个人身份信息属于个人敏感信息</span>，收集上述信息为实现提现功能所必须，如您不提供，您将无法使用提现功能，但不影响您使用本软件基本业务功能。</view>
    <view>1.2.4 问卷调查</view>
    <view>· 如您愿意参加本公司举办的问卷调查，您可能需要提供额外的个人基本资料及个人教育工作信息，包括您的性别、职业、所在行业和个人兴趣，软件使用行为及习惯，这些信息将有助于我们了解本软件的运行情况，并根据反馈改进我们的软件服务设计。我们将在邀您参加相关活动之前获得您的授权，如您选择不提供这些信息，您可能无法参与该活动，但不会影响您使用本软件的基本业务功能。</view>
    <view>1.2.5 客服</view>
    <view>· 当您与我们的客服互动或使用用户响应功能时，包括在线提交意见反馈、与在线/人工客服沟通，为了您的账号与系统安全，我们可能需要您先行提供账号信息，并与您之前提供的个人信息相匹配以验证您的用户身份。在您使用客服或用户响应功能时，我们可能还会需要收集您的联系方式（电话号码、电子邮箱）以及您与我们的<span class="font-bold">通信记录、通信内容</span>，您为解决客服需求向我们提供的软件使用资料，其中<span class="font-bold">通信记录和内容属于个人敏感信息</span>。我们收集这些信息是为了调查事实与帮助您解决问题，如您拒绝提供可能导致您无法使用本软件的用户响应机制，但不会影响您使用本软件的基本业务功能。</view>
    <view>1.2.6 推送及公告</view>
    <view>· 我们可能通过您的联系方式（包括电子邮箱、手机号码）向您发送广告营销信息（不具备定向推送功能），提供或推广本公司或第三方的产品和服务，您可以在收到的信息中找到相关的提示，您可根据提示指引选择退订或取消订阅。</view>
    <view>· 我们可能在我们的服务发生变化时向您发出与服务有关的公告。您可能无法取消和限制这些与服务有关且性质不属于推广的公告。</view>
    <view>· 为确保本软件处于关闭或后台运行状态下可正常接收到客户端推送的广播信息，本软件须使用自启动能力，将存在一定频率通过系统发送广播唤醒本软件自启动或关联启动行为，是因实现功能及服务所必要的。当您打开本软件内容类推送消息，在征得您的明确同意后，会跳转打开相关内容。在未征得您同意的情况下，则不会有关联启动。当您打开本软件内部下载的文件后，会关联启动第三方<span class="font-bold">APP</span>。</view>
    <view>1.3 <span class="font-bold">征得授权同意的例外</span>。根据相关法律法规及国家标准，我们可能会在以下情形中无需征求您的授权同意，收集、使用您的个人信息：</view>
    <view>1.3.1 为订立或者履行您与我们之间的合同所必需的；</view>
    <view>1.3.2 为本公司履行法定职责或者法定义务所必需的；</view>
    <view>1.3.3 为应对突发公共卫生事件，或者紧急情况下为保护自然人的生命健康和财产安全所必需的；</view>
    <view>1.3.4 为公共利益实施新闻报道、舆论监督等行为在合理的范围内处理个人信息；</view>
    <view>1.3.5 与国家安全、国防安全直接相关的；</view>
    <view>1.3.6 与公共安全、公共卫生、公共网络安全、网络环境治理、重大公共利益直接相关的；</view>
    <view>1.3.7 与刑事侦查、起诉、审判和判决执行等直接相关的；</view>
    <view>1.3.8 出于维护您或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；</view>
    <view>1.3.9 所涉及的个人信息是您自行向不特定社会公众公开的；</view>
    <view>1.3.10 从合法公开披露的信息中收集个人信息的；</view>
    <view>1.3.11 法律法规规定的其他情形。</view>
    <view>1.3.12 从合法公开披露的信息中收集个人信息的；</view>
    <view>1.3.13 法律法规规定的其他情形。</view>
    <view>2. 我们如何使用Cookie和同类技术</view>
    <view>为了统计和分析本软件的运营情况，我们使用了若干自动数据收集工具，目前包括<span class="font-bold">Cookie</span>和<span class="font-bold">Web beacon</span>。借助这些技术，记住您的身份，识别您的软件使用情况以及预防欺诈。我们承诺不会将上述技术用于本政策所述目的之外的任何用途。如您的设备或相关程序允许，您可以通过改变设置来关闭或删除上述技术，但您这一举动可能会影响您的使用体验，部分功能也可能无法正常使用。</view>
    <view>3. 我们如何存储个人信息</view>
    <view>我们会根据相关法律法规的要求，遵循个人信息保存时间最小化原则，合理地保存您的个人信息。</view>
    <view>3.1 保存的方式和期限</view>
    <view>我们会通过<span class="font-bold">AES、RSA</span>加密的方式存储您的信息，包括本地存储（例如利用APP进行数据缓存）、数据库和服务器日志等。</view>
    <view>在您使用本产品或服务期间，我们会持续保存您的个人信息。如您对账号进行注销或者本产品停止运营，我们将从注销或停止运营之日起保存您的个人信息3年，如法律法规对相关个人信息规定了更长的存储期限，则我们会在法律法规规定的最短期限内保存您的个人信息。在超出上述期限后，我们会对您的个人信息进行删除或匿名化处理。</view>
    <view>3.2 保存地域</view>
    <view>我们在中华人民共和国境内收集和产生的个人信息，将存储在中华人民共和国境内。</view>
    <view>3.3 您的个人信息如何在全球范围转移</view>
    <view>现阶段我们不存在跨境传输您的个人信息的行为。</view>
    <view>4. 我们如何保护您的个人信息</view>
    <view>我们高度重视您的个人信息的保护，采用了<span class="font-bold">AES</span>和<span class="font-bold">RSA</span>加密技术来确保您的个人信息的安全。</view>
    <view>4.1 我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们使用了下列各种安全技术和程序，保护您的个人信息：</view>
    <view>4.1.1 我们在您的应用软件与服务器之间交换数据（如信用卡信息）时启用了<span class="font-bold">SSL</span>协议提供加密保护；</view>
    <view>4.1.2 我们采取了传输层安全协议等加密技术，通过<span class="font-bold">HTTPS</span>等方式提供浏览服务，确保您的数据在传输过程中的安全；</view>
    <view>4.1.3 我们确保第三方仅能通过<span class="font-bold">HTTPS</span>方式访问我们分享的<span class="font-bold">API</span>接口，我们只提供帐号验证功能，因此第三方是无法调取您的个人信息；同时我们采用了完善的防<span class="font-bold">SQL</span>注入手段，从而防止数据库系统受到外界攻击；</view>
    <view>4.1.4 我们采取加密技术对您的个人信息进行加密保存，您的密码是经过二次<span class="font-bold">MD5</span>等技术加密处理的，是密文信息；</view>
    <view>4.1.5 在某些服务中，我们还可能通过电话、短信等方式提醒您更改密码。</view>
    <view>4.2 我们在信息安全领域已经取得了以下认证：</view>
    <view>《信息安全技术-网络安全等级保护-三级》</view>
    <view>4.3 我们只允许有必要知晓这些信息的公司及公司关联方的员工、合作伙伴访问您的个人信息，并为此设置了严格的访问权限控制和监控机制。我们同时要求可能接触到您个人信息的所有人员履行相应的保密义务。</view>
    <view>4.4 互联网并非绝对安全的环境，而且电子邮件、即时通讯、社交软件等与其他用户的交流方式无法确定是否完全加密，我们建议您使用此类工具时请使用复杂密码或不定期修改账号密码，并注意保护您的个人信息安全。</view>
    <view>4.5 我们将尽力确保您发送给我们的信息安全。如果我们的物理、技术、或管理防护设施遭到恶意破坏，导致信息被非授权访问、公开披露、篡改、或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。</view>
    <view>4.6 如不幸发生个人信息安全事件，我们将按照法律法规的要求及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们会及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。</view>
    <view>5. 我们如何共享、转让、公开披露您的个人信息</view>
    <view>5.1 共享</view>
    <view>为了实现业务功能，我们可能会向第三方共享您的个人信息，以实现您需要的服务或特定功能。如我们需要共享您的个人敏感信息，我们会再次征求您的授权同意。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享必要的个人信息。我们会通过签订协议的方式严格限制第三方使用您个人信息的行为，确保第三方按照我们的要求、本政策以及其他任何相关的保密和安全措施来处理个人信息。同时我们也会采取有效的技术保护措施保证您的个人信息在共享过程中的安全。我们会尽量对共享内容中的个人信息进行匿名化处理，您理解并同意，匿名化处理后的信息无法识别或关联到您，已不属于法律意义上的个人信息，其处理、使用、共享、转让无需征得您的授权同意。</view>
    <view>目前，我们在以下情形中需要共享您的个人信息：</view>
    <view>5.1.1 为便于我们基于本公司统一的账号体系向您提供一致化服务以及便于您进行统一管理，保障系统和账号安全，您的个人信息可能会在本公司产品内部进行必要共享。</view>
    <view>5.1.2 为保障我们的产品相关功能的实现及安全稳定运行，部分服务会由第三方提供，我们需要在您使用对应功能时向第三方共享您的个人信息，包括通过软件工具开发包（SDK）或其他类似的应用程序的方式。您在我们的产品中使用该等第三方提供的服务时，您同意由其直接收集和处理您的个人信息，我们会努力审查该第三方的业务准入资质并努力要求其合法合规性与安全性。为了最大程度保障您的信息安全，我们强烈建议您在使用由第三方服务商提供的服务前先行查看其隐私条款。为保障您的合法权益，如您发现第三方服务商提供的服务存在风险时，建议您立即终止相关操作并及时与我们取得联系。目前，我们的产品与第三方共享个人信息的情况请查阅<span class="font-bold">《第三方信息共享清单》</span>，产品内访问路径为我—关于我们—第三方信息共享清单。</view>
    <view class="text-center">第三方信息共享清单</view>
    <view class="tableList">
      <uni-table ref="tableList" emptyText="暂无数据">
        <uni-tr>
          <uni-th>服务或SDK</uni-th>
          <uni-th>使用场景</uni-th>
          <uni-th>信息类型</uni-th>
          <uni-th>收集/共享方式</uni-th>
          <uni-th>公司名称</uni-th>
        </uni-tr>
        <uni-tr>
          <uni-td>易盾一键登录</uni-td>
          <uni-td>注册登录：易盾整合了三大运营商的号码认证能力，提供了快速验证用户输入的手机号码和本机SIM卡号码一致性的功能，提高用户体验和安全性</uni-td>
          <uni-td>设备信息（包括IMEI、IDFA、Android ID、IMSI、MAC、OAID、设备型号，操作系统，应用崩溃信息，软件列表、通知开关状态）、网络信息（包括IP地址、WiFi信息、基站信息）、位置信息、手机号码  </uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>网易易盾是网易(杭州)网络有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>支付宝SDK</uni-td>
          <uni-td>用户使用支付宝注册、授权登录；消费与支付：绑定支付宝账号，收发红包功能</uni-td>
          <uni-td>设备信息(用于风险控制和网络优化)-(IMEI、IMSI、Android ID、MAC地址、硬件序列号、ICCID、SSID BSSID、传感器信息、网络类型、运营商信息、WIFI状态/参数/列表、系统设置、系统属性、设备品牌、设备型号、操作系统、IP地址)。 身份认证信息-(相机:设备权限、人脸信息）</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>支付宝（中国）网络技术有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>微信SDK</uni-td>
          <uni-td>在用户使用微信注册、授权登录或者分享时使用</uni-td>
          <uni-td>设备标识符（Android如IMEI、Android ID、IMSI、ICCID、MEID，iOS如IDFV）、设备MAC地址、IP地址、位置信息（如GPS、蓝牙）、WLAN接入点（如SSID、BSSID）、分享图片或内容</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>腾讯科技（深圳）有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>微信支付SDK</uni-td>
          <uni-td>在用户使用微信支付时使用</uni-td>
          <uni-td>设备标识符（Android如IMEI、Android ID、硬件序列号/Serial）、设备MAC地址、WLAN接入点（如SSID、BSSID）</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>财富通支付科技有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>抖音SDK</uni-td>
          <uni-td>在用户使用抖音注册、授权登录或者分享时使用</uni-td>
          <uni-td>设备标识符（Android如IMEI、Android ID、GAID、OAID、IMSI、ICCID、MEID，iOS如IDFV）、设备MAC地址、IP地址、位置信息（如GPS、蓝牙）、WLAN接入点（如SSID、BSSID）、设备传感器信息</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>北京抖音信息服务有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>IM融云SDK</uni-td>
          <uni-td>推送及公告：通过识别设备信息为App赋予推送能力，用于消息推送。</uni-td>
          <uni-td>设备信息（包括IMEI、IDFA、Android ID、IMSI、MAC、OAID、设备型号，操作系统，应用崩溃信息，软件列表、通知开关状态）、 位置信息、 网络信息（包括IP地址、WiFi信息、基站信息）</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>京云中融信网络科技有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>OPPO推送SDK</uni-td>
          <uni-td>推送及公告：用于在OPPO设备上推送消息</uni-td>
          <uni-td>设备信息：IMEI号，Serial Number，IMSI，User ID，Android ID，Google Advertising ID, 手机Region设置，设备型号，手机电量，手机操作系统版本及语言），应用信息：APP包名及版本号，运行状态，网络信息：IP或域名连接结果、当前网络类型，消息发送结果，通知栏状态，锁屏状态</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>OPPO广东移动通信有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>华为推送SDK</uni-td>
          <uni-td>推送及公告：用于在华为设备上推送消息</uni-td>
          <uni-td>设备信息：IMEI、IDFA、Android ID、IMSI、MAC、OAID</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>华为技术有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>VIVO推送SDK</uni-td>
          <uni-td>推送及公告：用于在VIVO设备上推送消息</uni-td>
          <uni-td>设备信息、网络状态信息</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>广东天宸网络科技有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>小米推送SDK</uni-td>
          <uni-td>推送及公告：用于在小米设备上推送消息</uni-td>
          <uni-td>设备信息（包括IMEI、OAID、IMEI MD5/MEIDMD5、Android ID、VAID、AAID、MID，设备型号、存储、设置信息）、应用使用信息（包括版本号、安装更新时间、应用设置）</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>北京小米移动软件有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>高德地图</uni-td>
          <uni-td>用于聊天和发动态内容共享定位信息</uni-td>
          <uni-td>定位权限、服务、精确位置</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>高德软件有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>360加固保SDK</uni-td>
          <uni-td>基础加固服务、数据分析服务、盗版监测服务在内的加固安全业务相关的各项功能和服务</uni-td>
          <uni-td>应用或SDK的包名、版本、签名文件的MD5；用于基础加固服务，以及盗版监测、运营数据分析、崩溃日志分析、终端环境检测、病毒木马检测服务。</uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>北京三六零智领科技有限公司</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>个推SDK</uni-td>
          <uni-td>为App用户提供消息推送技术服务</uni-td>
          <uni-td>
            （1）设备信息、网络信息：必选信息：设备平台、设备厂商、设备品牌、设备型号及系统版本、OAID、AndroidID、WIFI连接信息、运营商信息、DHCP、SSID、BSSID
            可选信息：IMEI、MAC、Google Advertising ID（GAID）、Serial Number、IMSI、ICCID、IP地址、基站信息。用于生成唯一的推送目标ID（CID）和设备ID（GID），以此保证消息推送的准确下发和消息设备的准确识别。
            （2）位置相关信息：应景推送、智能推送和应急推送扩展功能的必选信息，提供线下场景的精细化推送，可以为您推荐更符合您需要的推送内容，减少无用推送消息对您的打扰。应国家有关部门要求，为了提升移动互联网技术服务社会公益的功能，发挥 APP 消息推送在灾害预警方面的作用，当发生地震及气象等重大灾害时，通过开发者的APP 推送通道实时向受影响地区的用户下发相关的灾害通知信息
            （3）应用列表信息：智能推送、应急推送和链路调节器扩展功能的必选信息，推荐更符合您需要的推送内容，减少无用推送信息对您的打扰。应国家有关部门要求，为了提升移动互联网技术服务社会公益的功能，发挥 APP 消息推送在灾害预警方面的作用，当发生地震及气象等重大灾害时，通过开发者的APP 推送通道实时向受影响地区的用户下发相关的灾害通知信息。我们采⽤合并链路技术进⾏技术推送，当⼀个设备有多个APP的推送链路同时活跃时，我们会随机合并成⼀条链路，以达到为您省电省流量的⽬的，当一个设备有离线推送消息待下发的场景时，通过关联启动功能可以下发离线消息，您可以选择开启或关闭这项服务，当您关闭这项服务时，关联启动也同时会关闭，会导致电量和流量消耗加大的同时消息触达率也会降低。
            </uni-td>
          <uni-td>SDK本机采集</uni-td>
          <uni-td>每人互动股份有限公司</uni-td>
        </uni-tr>
        
      </uni-table>
    </view>
    
    <view>5.2 转让</view>
    <view>我们不会将您的个人信息转让给任何公司、组织或个人，但以下情况除外：</view>
    <view>5.2.1 如遇特殊情况，在获得您的明确授权同意后，我们会向其他方转让您的个人信息；</view>
    <view>5.2.2 在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会要求新的持有您信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。</view>
    <view>5.3 公开披露</view>
    <view>我们仅会在以下情况下，公开披露您的个人信息：</view>
    <view>5.3.1 在获得您的明确授权同意后；</view>
    <view>5.3.2 基于有奖活动中的披露：如在公布中奖活动名单时，我们会脱敏展示中奖者手机号或用户名；</view>
    <view>5.3.3 基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息；</view>
    <view>5.4 社交网络</view>
    <view>我们的社交网络服务，是专为使您与世界各地的用户交流而设计，您可以使交流信息实时、广泛地传递。当您使用我们的服务中的社交网络功能时，您将可能分享一些个人信息，我们在某些服务中为您提供了可以自主控制个人信息分享的用户范围，同时您还可以要求我们删除您的相关个人信息。</view>
    <view>5.4.1 您可能通过社交功能分享的个人信息：包括您在社区上传、发布或授权公开的信息，您通过直播、录播分享传播的信息，您对其他人上传或发布的信息作出的回应，以及包括与这些信息有关的位置数据和日志信息；</view>
    <view>5.4.2 其他用户可能通过社交功能分享与您有关的信息；</view>
    <view>5.4.3 关于共享信息的删除：只要您不删除共享信息，有关信息会一直留存在公共领域；即使您删除共享信息，有关信息仍可能由其他用户或不受本公司控制的非关联第三方独立地缓存、复制或储存，或由其他用户或该等第三方在公共领域保存；</view>
    <view>5.4.4 我们对您通过社交功能分享的信息的保护：在一些情况下，您可通过我们隐私设定来控制有权浏览您共享信息的用户范围；你还可以要求从我们的服务中删除您的相关信息，请您通过本政策第9章所述的联系方式联系我们。</view>
    <view>5.5 共享、转让、公开披露个人信息时事先征得授权同意的例外。根据相关法律法规的规定，在以下情形中，我们共享、转让、公开披露个人信息不必事先征得您的授权同意：</view>
    <view>5.5.1 与国家安全、国防安全直接相关的；</view>
    <view>5.5.2 与公共安全、公共卫生、重大公共利益直接相关的；</view>
    <view>5.5.3 与刑事侦查、起诉、审判和判决执行等直接相关的；</view>
    <view>5.5.4 出于维护您或其他个人的生命、财产等重大合法权益但又很难得到您本人授权同意的；</view>
    <view>5.5.5 您自行向不特定社会公众公开的个人信息；</view>
    <view>5.5.6 与公司履行法律法规规定的义务相关的；</view>
    <view>5.5.7 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</view>
    <view>6. 您的权利</view>
    <view>在您使用本软件期间，我们可能会视软件服务具体情况为您提供相应的操作设置，以便您可以访问、查询、更正、删除您的相关个人信息，注销您的用户账户，撤销已同意的授权，获取个人信息副本。按照相关的法律法规，我们保障您对自己的个人信息行使以下权利。此外，我们还设置了投诉举报渠道，您可以通过第9章所述联系方式与我们取得联系，您的意见将会得到及时的处理。</view>
    <view>6.1 您有权访问您的个人信息</view>
    <view>您可以通过本软件登录您的个人账号，随时访问您的账号中的网络身份标识信息， 具体路径为：我—查看用户账号、昵称或头像。您也可以在《个人信息收集清单》中查阅我们收集您的个人信息的情况概要，产品内访问路径为我—关于我们—个人信息收集清单。</view>
    <view>如您无法通过前述方式访问您的个人信息，或您需获取通过前述方式无法获知的个人信息内容，您可以通过本政策第9条提供的联系方式与我们联系，我们将在15个工作日内给您回复。</view>
    <view>6.2 您有权更正您的个人信息</view>
    <view>您可以通过本软件登录您的个人账号，随时更正您的账号中的网络身份标识信息，具体路径为：我—更改昵称或头像。</view>
    <view>如您无法通过前述方式更正您的个人信息，您可以通过本政策第9条提供的联系方式与我们联系，我们将在15个工作日内给您回复。</view>
    <view>6.3 您有权删除您的个人信息</view>
    <view>在以下情形中，您可以向我们提出删除个人信息的请求：</view>
    <view>6.3.1 如果我们处理个人信息的行为违反法律法规；</view>
    <view>6.3.2 如果我们收集、使用您的个人信息，却未征得您的同意；</view>
    <view>6.3.3 如果我们处理个人信息的行为违反了与您的约定；</view>
    <view>6.3.4 如果您不再使用我们的产品或服务，或您注销了账号；</view>
    <view>6.3.5 如果我们不再为您提供产品或服务。</view>
    <view>您可以通过本政策第9条提供的联系方式联系我们删除您的个人信息，若我们决定响应您的删除请求，我们会在15个工作日内删除，我们还将同时通知从我们获得您的个人信息的实体，要求其及时删除，除非法律法规另有规定，或这些实体获得您的独立授权。当您从我们的服务中删除信息后，我们可能不会立即备份系统中删除相应的信息，但会在备份更新时删除这些信息。</view>
    <view>6.4 您有权改变您授权同意的范围</view>
    <view>我们向您提供的每个业务功能都需要一些您的基本个人信息才能得以完成，您可以在《个人信息权限清单》或“隐私权限设置”中查看我们产品的个人信息权限申请与使用情况。如您想撤回您的授权同意，您可以在您使用的设备中进行修改，具体操作路径为：设置—隐私，或在我们的产品中通过隐私权限管理查阅个人信息的权限申请与使用情况并撤销权限使用的同意，访问路径为我—关于我们—隐私协议。</view>
    <view>如您无法通过前述方式改变您授权同意的范围，您还可以通过本政策第9条提供的联系方式向我们提出申请，我们将在15个工作日内回复您的请求。如您需要撤回收集必要个人信息的同意，或撤回收集全部个人信息的同意，将会导致我们无法为您提供本产品或服务的基本业务功能。在此情形下，如您仍希望撤回相关同意，您可以通过注销您的用户账户实现该需求，注销路径为：我-设置-账号与安全-注销账号。</view>
    <view>6.5 您有权注销您的用户账户</view>
    <view>您随时可注销此前注册的账户，您可以在我们的产品或服务的相关功能设置页面向我们提交注销申请，我们将在15个工作日内注销您的账户。具体注销路径为：我-设置-账号与安全-注销账号。</view>
    <view>如您无法通过前述方式注销账户，您也可通过本政策第9条提供的联系方式向我们提出申请。在注销账户之后，我们将停止为您提供产品或服务，并依据您的要求，删除您的个人信息，但法律法规另有规定的除外。</view>
    <view>6.6 您有权申请获得个人信息副本</view>
    <view>如您需要获取您的个人信息副本，您可以通过本政策第9条提供的联系方式向我们提出申请，我们将在15个工作日内回复您的申请。</view>
    <view>6.7 个人信息转移</view>
    <view>如您需要将个人信息转移至指定的第三方的，您可以通过本政策第9条提供的联系方式向我们提出申请，我们将在15个工作日内回复您的申请。在技术可行且符合国家网信部门规定条件的情况下，我们可以按照您的要求，将您的个人信息转移至您指定的第三方。</view>
    <view>6.8 信息系统自动决策的约束</view>
    <view>如我们使用的信息系统依据自动决策机制作出决定，且这些决定对您的合法权益造成显著影响的，您有权通过本政策第9条提供的联系方式向我们反馈或投诉，我们将对自动决策结果进行人工复核或提供其他适当的救济方式。</view>
    <view>6.9 响应你的请求</view>
    <view>您可以通过本政策第9条提供的联系方式向我们提出与个人信息相关的请求，我们会在15个工作日内响应。为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求</view>
    <view>对于您的合理请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，请您理解我们将视情况收取一定成本费用。对于无端重复，需要过多技术手段，给他人合法权益带来风险或者不切实际的请求，很抱歉我们将可能会予以拒绝。</view>
    <view>6.10 特殊情况</view>
    <view>按照法律法规要求，很抱歉以下情形中我们将无法响应您的请求：</view>
    <view>6.10.1 与本公司履行法律法规规定的义务相关的</view>
    <view>6.10.2 与国家安全、国防安全直接相关的；</view>
    <view>6.10.3 与公共安全、公共卫生、重大公共利益直接相关的；</view>
    <view>6.10.4 与刑事侦查、起诉、审判和判决执行等直接相关的；</view>
    <view>6.10.5 有充分证据表明您存在主观恶意或滥用权利的；</view>
    <view>6.10.6 出于维护您或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；</view>
    <view>6.10.7 响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</view>
    <view>6.10.8 涉及商业秘密的。</view>
    <view>7. 有关未成年人使用服务的提示</view>
    <view>公司非常重视对未成年人个人信息的保护，18周岁以下的未成年人未经法定监护人同意不得使用本软件。如您是18周岁以下的未成年人的法定监护人，应监督和管控该未成年人使用我们服务的行为，该未成年人创建账户应通过您的事先同意。</view>
    <view>7.1 对于经法定监护人同意而收集未成年人个人信息的情况，我们只会在受到法律允许、法定监护人明确同意或者保护未成年人所必要的情况下使用或公开披露此信息。</view>
    <view>7.2 如果未成年人未经法定监护人的同意而使用我们的服务，该未成年人的法定监护人有权与我们取得联系并要求我们删除该未成年人的个人信息，我们核实后将立即删除。</view>
    <view>7.3 如果我们发现本公司在未事先获得可证实的法定监护人同意的情况下收集了未成年人的个人信息，则会设法尽快删除相关数据。</view>
    <view>8. 本政策的适用范围及变更</view>
    <view>8.1 适用范围</view>
    <view>本政策适用于本公司提供的Whack软件服务。</view>
    <view>本软件可能包括帮助您访问第三方的链接，包括：本公司通过广告或其他方式向您提供链接，方便您直接接入第三方的服务或网站。我们请您特别注意， 该等第三方服务是由相关第三方提供，为保障您的合法权益，请您仔细阅读相关第三方的隐私类政策指引后决定是否使用该等第三方提供的服务。</view>
    <view>8.2 个人信息保护政策的变更</view>
    <view>我们可能会根据公司业务或相关政策的调整对本政策进行修订，为了保障您的用户知悉权，我们将在本页面上发布对本政策所做的任何变更并通过应用内弹窗的方式提示您阅读，并重新征得您的授权同意。对于重大变更，我们还会在本页面首部进行明确提示，本政策所指的重大变更包括但不限于：</view>
    <view>8.2.1当我们的服务模式发生重大变化时，如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</view>
    <view>8.2.2 当我们在所有权结构、组织架构等方面发生重大变化时，如业务调整、破产并购等引起的所有者变更等；</view>
    <view>8.2.3 当我们对个人信息共享、转让或公开披露的主要对象发生变化时；</view>
    <view>8.2.4 当您参与个人信息处理方面的权利及其行使方式发生重大变化时；</view>
    <view>8.2.5 当我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；</view>
    <view>8.2.6 当我们的个人信息安全影响评估报告表明存在高风险时。</view>
    <view>9. 联系方式</view>
    <view>如您对本政策有任何疑问、意见或建议，或您对我们的个人信息处理行为有任何投诉或申诉，您可通过以下方式与我们联系，我们会在15个工作日内回复处理意见或结果。</view>
    <view>公司名称：上海格乐喜网络信息科技有限公司</view>
    <view>邮箱地址：gelexiwork@163.com</view>
    <view>注册地址：上海市自由贸易试验区临港新片区丽正路1628号4幢1-2层</view>
    <view>办公地址：上海市浦东新区海阳西路666弄18号803室</view>
    
    <view class="text-center">个人信息收集清单</view>
    <view class="tableList tableList2">
      <uni-table ref="tableList" emptyText="暂无数据">
        <uni-tr>
          <uni-th>序号</uni-th>
          <uni-th>收集内容</uni-th>
          <uni-th>业务功能</uni-th>
          <uni-th>敏感信息</uni-th>
          <uni-th>所属平台</uni-th>
        </uni-tr>
        <uni-tr>
          <uni-td>1</uni-td>
          <uni-td>允许使用网络</uni-td>
          <uni-td>网络通信</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>2</uni-td>
          <uni-td>访问网络状态权限</uni-td>
          <uni-td>业务中用到的网络请求</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>3</uni-td>
          <uni-td>改变网络连接状态权限</uni-td>
          <uni-td>业务中用到的网络请求</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>4</uni-td>
          <uni-td>允许程序修改声音设置信息</uni-td>
          <uni-td>语音通话</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>5</uni-td>
          <uni-td>读、写存储卡</uni-td>
          <uni-td>在手机上读取、保存应用数据</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>6</uni-td>
          <uni-td>连接配对过的蓝牙设备</uni-td>
          <uni-td>语音通话支持蓝牙耳机</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、iOS、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>7</uni-td>
          <uni-td>唤醒锁定</uni-td>
          <uni-td>接受消息推送</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>8</uni-td>
          <uni-td>录制声音</uni-td>
          <uni-td>发送语音消息</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>9</uni-td>
          <uni-td>允许发现和配对蓝牙设备</uni-td>
          <uni-td>语音通话支持蓝牙耳机</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、iOS、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>10</uni-td>
          <uni-td>相机权限</uni-td>
          <uni-td>设置头像</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、iOS、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>11</uni-td>
          <uni-td>相机权限</uni-td>
          <uni-td>发送图片消息、设置头像</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、iOS、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>12</uni-td>
          <uni-td>麦克风权限</uni-td>
          <uni-td>语音通话，发送语音消息</uni-td>
          <uni-td>否</uni-td>
          <uni-td>iOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>13</uni-td>
          <uni-td>修改音频权限</uni-td>
          <uni-td>语音通话，发送语音消息</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>14</uni-td>
          <uni-td>请求安装应用</uni-td>
          <uni-td>应用安装</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>15</uni-td>
          <uni-td>读取手机状态权限</uni-td>
          <uni-td>个推推送：获取机器码的权限，用于创建唯一用户ID</uni-td>
          <uni-td>是</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>16</uni-td>
          <uni-td>允许程序挂载和反挂载外部文件系统</uni-td>
          <uni-td>个推推送：用于外部配置文件加载</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>17</uni-td>
          <uni-td>推送服务</uni-td>
          <uni-td>个推推送：唤醒机器的权限，用于长链接心跳</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>18</uni-td>
          <uni-td>个推推送权限</uni-td>
          <uni-td>个推推送：用于校验是否为个推推送的应用</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>19</uni-td>
          <uni-td>读取手机号码</uni-td>
          <uni-td>网易易盾：一键登录 读取手机号码</uni-td>
          <uni-td>是</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>20</uni-td>
          <uni-td>华为厂商通道权限</uni-td>
          <uni-td>华为厂商通道：华为厂商通道自定义权限，用户华为手机推送</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>21</uni-td>
          <uni-td>小米厂商通道权限</uni-td>
          <uni-td>小米厂商通道：小米厂商通道自定义权限，用户小米手机推送</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>22</uni-td>
          <uni-td>魅族厂商通道权限</uni-td>
          <uni-td>魅族厂商通道：魅族厂商通道自定义权限，用于魅族手机推送</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>23</uni-td>
          <uni-td>OPPO厂商通道权限</uni-td>
          <uni-td>OPPO厂商通道：OPPO厂商通道自定义权限，用于OPPO手机推送</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>24</uni-td>
          <uni-td>允许获取所有运行的应用信息</uni-td>
          <uni-td>允许获取所有运行的应用信息</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>25</uni-td>
          <uni-td>获取手机IMEI/ANDROID-ID</uni-td>
          <uni-td>接口API header请求头需要知道用户设备ID，如果该用户违规可以及时封控</uni-td>
          <uni-td>是</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>26</uni-td>
          <uni-td>读写日程提醒权限</uni-td>
          <uni-td>用于设置和提醒用户待办事宜</uni-td>
          <uni-td>否</uni-td>
          <uni-td>Android、HarmonyOS</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>27</uni-td>
          <uni-td>安装权限管理</uni-td>
          <uni-td>用于版本更新</uni-td>
          <uni-td>是</uni-td>
          <uni-td>Android</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-td>备注</uni-td>
          <uni-td colspan="4">
            前述个人信息内容仅为公司所提供服务进行必要收集和使用。如您使用小米、魅族、华为、苹果等品牌手机或从其他应用市场下载该产品，上述手机厂商或应用市场服务商可能会重复或额外收集您个人信息用于提供相应手机厂商或应用市场服务商的服务，具体信息收集情况请咨询上述手机厂商或应用市场服务商的隐私政策或相关声明。
          </uni-td>
        </uni-tr>
      </uni-table>
    </view>
    <view class="text-right mt32">2025年12月18日更新</view>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  import uniTable from '@/components/uni-table/components/uni-table/uni-table.vue'
  import uniTd from '@/components/uni-table/components/uni-td/uni-td.vue'
  import uniTh from '@/components/uni-table/components/uni-th/uni-th.vue'
  import uniTr from '@/components/uni-table/components/uni-tr/uni-tr.vue'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  
  function backPage() {
    window.client.closeWebview()
  }
  
  const tableWidth = ref(uni.upx2px(100))
  const tableWidth2 = ref(uni.upx2px(200))
  
  // onMounted(()=>{
  //   let dom = document.getElementById('app')
  //   dom.style.paddingTop = 0
  // })
  
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 88rpx 32rpx;
    background-color: #ffffff;
    // font-family: MiSans, MiSans;
    view {
      margin-bottom: 20rpx;
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(0,0,0,0.8);
      line-height: 48rpx;
    }
    .mt32 {
      margin-top: 60rpx;
    }
    .title {
      font-weight: 700;
      font-size: 40rpx;
      color: #000000;
      line-height: 40rpx;
      text-align: center;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }
    .text-indent {
      text-indent: 66rpx;
    }
    .font-bold {
      font-weight: bold;
    }
  }
  .tableList {
    view {
      margin: 0;
    }
    // margin: 18rpx 30rpx;
    border: 1px solid #dee2e5;
    // border-top: none;
    // border-bottom: none;
    :deep .uni-table-th {
      font-size: 24rpx;
      line-height: 1.2;
      font-weight: 400;
      color: #606178;
      background-color: #F4F5F7;
      border-right: 1px #dee2e5 solid;
      &:last-of-type {
        border-right: none;
      }
      .uni-table-th-row {
        width: 200rpx;
      }
    }
    :deep .uni-table-tr {
      .size {
        font-size: 24rpx;
        color: #0E1B2E;
      }
      .uni-table-td {
        font-size: 24rpx;
        color: #0E1B2E;
        border-right: 1px #dee2e5 solid !important;
        // border-color: #dee2e5 !important;
        &:last-of-type {
          border-right: none !important;
        }
      }
      &:last-of-type {
        .uni-table-td {
          border: none;
        }
      }
    }
    &.tableList2 {
      :deep .uni-table-th {
        .uni-table-th-row {
          width: 100rpx;
        }
      }
    }
  }
  
</style>