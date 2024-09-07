import{l as F,u as S,a as I,r as x,j as e,T as b,G as a,b as h,F as m,c as A,m as L,S as O,e as c,f as d,g as U,h as y,i as w,k as u}from"./index-DJhz6y4r.js";import{d as D,a as G}from"./CloudDone-DukinLze.js";function R(){const{campaignId:g}=F();S("Create Advertisement");const p=I(),[j,v]=x.useState(!0);x.useEffect(()=>{j||p("/auth/login")},[j,p]);const[t,i]=x.useState({name:"",isActive:!0,linkUrl:"",content:"",image:null,options:{image:!0,textOnly:!0,sidebar:!0,custom:!0}}),r=o=>{const{name:n,value:s,type:f,checked:k,files:T}=o.target;i(f==="checkbox"?{...t,[n]:k}:f==="file"?{...t,image:T[0]}:{...t,[n]:s})},l=o=>{const{name:n,checked:s}=o.target;i({...t,options:{...t.options,[n]:s}})},C=async o=>{var n;if(o.preventDefault(),!t.options.image&&!t.options.sidebar&&!t.options.custom&&!t.options.textOnly){alert("You must select display type");return}else if((t.options.image||t.options.sidebar||t.options.custom)&&t.image===null){alert("Select image for the advertisement");return}else{!t.options.image&&!t.options.sidebar&&!t.options.custom&&(t.image=null);try{const s=await w.post(`/api/advertiser/campaign/${g}/create`,t,{headers:{"Content-Type":"multipart/form-data"}});(s==null?void 0:s.status)===201?(u.success(s.data.message),p(`/advertiser/campaings/${g}`)):console.error(s)}catch(s){console.log(s),(n=s==null?void 0:s.response)!=null&&n.status&&(s.response.status===401||s.response.status===403?(u.error(s.response.data.message),u.error("Login again"),localStorage.removeItem("token"),v(!1)):s.response.status===400&&u.success(s.response.data.message))}}};return e.jsxs(e.Fragment,{children:[e.jsx("center",{children:e.jsx(b,{variant:"h6",mb:3,children:"Create Advertisement"})}),e.jsx("form",{onSubmit:C,children:e.jsxs(a,{container:!0,spacing:0,children:[e.jsxs(a,{item:!0,xs:12,children:[e.jsx(h,{name:"name",label:"Name",value:t.name,onChange:r,fullWidth:!0,required:!0}),e.jsx(m,{component:"legend",sx:{mt:1},children:"Give a name for your advertisement which is only visible to you"})]}),e.jsx(a,{item:!0,xs:12,children:e.jsxs(A,{component:"fieldset",sx:{mb:2},children:[e.jsx(b,{component:"legend",sx:{mb:-.5,color:"inherit"},children:"Ads display types"}),e.jsx(L,{children:e.jsxs(O,{sx:{width:"100%"},children:[e.jsx(c,{control:e.jsx(d,{checked:t.options.image,onChange:l,name:"image"}),label:"Image + Text"}),e.jsx(c,{control:e.jsx(d,{checked:t.options.textOnly,onChange:l,name:"textOnly"}),label:"Text Only"}),e.jsx(c,{control:e.jsx(d,{checked:t.options.sidebar,onChange:l,name:"sidebar"}),label:"Sidebar"}),e.jsx(c,{control:e.jsx(d,{checked:t.options.custom,onChange:l,name:"custom"}),label:"Custom"}),!t.options.image&&!t.options.sidebar&&!t.options.custom&&!t.options.textOnly&&e.jsx(U,{sx:{mt:-.5,color:"red"},children:"You must select display type"})]})})]})}),e.jsxs(a,{item:!0,xs:12,children:[e.jsx(h,{name:"linkUrl",label:"Link URL",value:t.linkUrl,onChange:r,fullWidth:!0,required:!0}),e.jsx(m,{component:"legend",sx:{mb:2,mt:1},children:"URL of your landing page. This may contain UTM parameters for tracking purpose."})]}),e.jsxs(a,{item:!0,xs:12,children:[e.jsx(h,{name:"content",label:"Content",value:t.content,onChange:r,fullWidth:!0,required:!0,multiline:!0,minRows:1}),e.jsx(m,{component:"legend",sx:{mb:2,mt:1},children:"Choose the content carefully that describes your ad. This will be visible to site visitors."})]}),(t.options.image||t.options.sidebar||t.options.custom)&&e.jsxs(a,{item:!0,xs:12,children:[e.jsxs(y,{variant:"contained",component:"label",startIcon:t.image?e.jsx(D,{}):e.jsx(G,{}),children:[t.image?"Added":"Upload Image",e.jsx("input",{accept:"image/*",type:"file",hidden:!0,name:"image",onChange:r})]}),e.jsx(m,{component:"legend",sx:{mb:2,mt:1},children:"We recommend to Choose image of ratio 13:10"})]}),e.jsx(a,{item:!0,xs:12,children:e.jsx(y,{variant:"contained",color:"primary",type:"submit",children:"Submit"})})]})})]})}function E(){return e.jsx(e.Fragment,{children:e.jsx(R,{})})}export{E as default};