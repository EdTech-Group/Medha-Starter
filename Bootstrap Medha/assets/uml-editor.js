(function(){
'use strict';
var KEY='medha-uml-editor-v1',NS='http://www.w3.org/2000/svg',FONT="Inter,'Segoe UI',Arial,sans-serif",INK='#4a2e1b';
var $=function(id){return document.getElementById(id)};
if(!$('uml-svg'))return;
function S(tag,a,kids){var e=document.createElementNS(NS,tag);for(var k in a){if(a[k]!=null)e.setAttribute(k,a[k])}(kids||[]).forEach(function(c){if(c)e.appendChild(c)});return e}
function T(x,y,str,o){o=o||{};var t=S('text',{x:x,y:y,'font-size':o.size||12,'font-weight':o.bold?600:400,'font-style':o.italic?'italic':null,'text-anchor':o.anchor||'start','text-decoration':o.under?'underline':null,fill:o.fill||'#0f172a','font-family':FONT,stroke:o.halo?'#fff':null,'stroke-width':o.halo?3:null,'paint-order':o.halo?'stroke':null,'stroke-linejoin':o.halo?'round':null});t.textContent=str;return t}
function fit(s,w,sz){s=String(s);var m=Math.floor((w-14)/((sz||12)*0.56));return s.length>m?s.slice(0,Math.max(1,m-1))+'…':s}
function nz(a){return (a||[]).filter(function(s){return String(s).trim()!==''})}

/* ---------- kinds ---------- */
var K={
 'class':{l:'Class',sh:'cls',w:180,comps:2,nm:'ClassName'},
 abstract:{l:'Abstract class',sh:'cls',w:180,comps:2,abs:1,nm:'AbstractClass'},
 interface:{l:'Interface',sh:'cls',w:180,comps:2,st:'interface',nm:'IService'},
 'enum':{l:'Enumeration',sh:'cls',w:150,comps:1,st:'enumeration',nm:'Status'},
 element:{l:'Element',sh:'cls',w:110,comps:0,nm:'Element'},
 metaclass:{l:'Metaclass',sh:'cls',w:150,comps:0,st:'metaclass',nm:'Class'},
 stereotype:{l:'Stereotype',sh:'cls',w:190,comps:1,st:'stereotype',nm:'MyStereotype'},
 object:{l:'Object (instance)',sh:'obj',w:170,nm:'obj1 : ClassName'},
 component:{l:'Component',sh:'cmp',w:190,h:110,box:1,st:'component',nm:'Component'},
 lollipop:{l:'Interface (lollipop)',sh:'lol',w:24,nm:'IInterface'},
 port:{l:'Port',sh:'port',w:14,nm:'port'},
 cclass:{l:'Structured class',sh:'frame',w:520,h:320,box:1,nm:'StructuredClass'},
 part:{l:'Part',sh:'part',w:150,h:80,box:1,nm:'part : Type'},
 'package':{l:'Package',sh:'pkg',w:240,h:160,box:1,nm:'Package'},
 profile:{l:'Profile',sh:'pkg',w:320,h:200,box:1,st:'profile',nm:'MyProfile'},
 node:{l:'Node',sh:'n3d',w:260,h:170,box:1,nm:'Node'},
 device:{l:'Device',sh:'n3d',w:260,h:170,box:1,st:'device',nm:'Device'},
 execenv:{l:'Execution environment',sh:'n3d',w:260,h:170,box:1,st:'execution environment',nm:'Environment'},
 artifact:{l:'Artifact',sh:'art',w:130,st:'artifact',nm:'file.jar'},
 note:{l:'Note / constraint',sh:'note',w:170,nm:'',tx:'Note text'}
};
var E={
 assoc:{l:'Association'},dassoc:{l:'Directed association',me:'open'},aggr:{l:'Aggregation',ms:'dia'},comp:{l:'Composition',ms:'diaF'},
 inherit:{l:'Generalization',me:'tri'},realize:{l:'Realization',dash:'7 4',me:'tri'},dep:{l:'Dependency',dash:'7 4',me:'open'},
 link:{l:'Link'},assembly:{l:'Connector'},delegation:{l:'Delegation',me:'open'},
 'import':{l:'Import',dash:'7 4',me:'open',st:'import'},access:{l:'Access',dash:'7 4',me:'open',st:'access'},merge:{l:'Merge',dash:'7 4',me:'open',st:'merge'},
 deploy:{l:'Deploy',dash:'7 4',me:'open',st:'deploy'},manifest:{l:'Manifest',dash:'7 4',me:'open',st:'manifest'},comm:{l:'Communication path'},
 extension:{l:'Extension',me:'triF'},noteLink:{l:'Note anchor',dash:'3 3',thin:1}
};
var DIAGS=[
 {k:'class',l:'Class',n:['class','abstract','interface','enum','note'],e:['assoc','dassoc','aggr','comp','inherit','realize','dep','noteLink'],h:'Static structure: classes with attributes and operations, linked by inheritance, association, aggregation and composition.'},
 {k:'object',l:'Object',n:['object','note'],e:['link','dassoc','dep','noteLink'],h:'Snapshot of instances (name : Class) with slot values and the links between them.'},
 {k:'component',l:'Component',n:['component','lollipop','port','note'],e:['assembly','dep','delegation','realize','noteLink'],h:'Components, their provided / required interfaces and dependencies.'},
 {k:'composite',l:'Composite structure',n:['cclass','part','port','note'],e:['assembly','delegation','dep','noteLink'],h:'Internal structure of a class: parts nested inside, ports on the borders, connectors between them.'},
 {k:'package',l:'Package',n:['package','element','note'],e:['dep','import','access','merge','inherit','noteLink'],h:'Packages and their elements. Drop elements onto a package to nest them.'},
 {k:'deployment',l:'Deployment',n:['node','device','execenv','artifact','component','note'],e:['comm','deploy','manifest','dep','noteLink'],h:'Hardware nodes and the artifacts deployed on them. Drop artifacts onto a node to nest them.'},
 {k:'profile',l:'Profile',n:['metaclass','stereotype','profile','enum','note'],e:['extension','inherit','assoc','import','noteLink'],h:'Stereotypes with tagged values extending metaclasses; constraints as notes.'}
];
var TPL={
'class':{n:[
 ['cu','class',40,40,190,0,'Customer',{a:['-id: int','-name: String','-email: String'],m:['+placeOrder(): Order','+history(): List']}],
 ['or','class',340,40,200,0,'Order',{a:['-id: int','-date: Date','-status: Status'],m:['+total(): Money','+cancel(): void']}],
 ['st','enum',650,40,150,0,'Status',{a:['NEW','PAID','SHIPPED']}],
 ['ol','class',340,260,200,0,'OrderLine',{a:['-qty: int','-price: Money'],m:['+subtotal(): Money']}],
 ['pr','class',650,260,190,0,'Product',{a:['-sku: String','-title: String'],m:['+price(): Money']}],
 ['pa','abstract',40,260,190,0,'Payment',{a:['#amount: Money'],m:['+pay(): bool']}],
 ['cp','class',40,450,190,0,'CardPayment',{a:['-cardNo: String']}],
 ['no','interface',340,450,200,0,'Notifier',{m:['+send(msg: String)']}],
 ['em','class',650,450,190,0,'EmailNotifier',{m:['+send(msg: String)']}]],
 e:[['assoc','cu','or','places','1','0..*'],['comp','or','ol','','1','1..*'],['dassoc','ol','pr','','0..*','1'],['dassoc','or','st','',''  ,''],['inherit','cp','pa','','',''],['dassoc','pa','or','settles','0..*','1'],['dep','pa','no','notifies','',''],['realize','em','no','','','']]},
'object':{n:[
 ['c','object',40,50,200,0,'alice : Customer',{a:['id = 42','name = "Alice"','email = "a@x.org"']}],
 ['o1','object',340,30,200,0,'o1 : Order',{a:['id = 1001','status = PAID']}],
 ['o2','object',340,220,200,0,'o2 : Order',{a:['id = 1002','status = NEW']}],
 ['l1','object',650,30,190,0,'l1 : OrderLine',{a:['qty = 2','price = 9.50']}],
 ['p','object',650,220,190,0,'p1 : Product',{a:['sku = "A-17"','title = "Lamp"']}],
 ['nt','note',40,260,200,0,'',{tx:'Snapshot taken after checkout of o1.'}]],
 e:[['link','c','o1','','',''],['link','c','o2','','',''],['link','o1','l1','','',''],['link','l1','p','','',''],['noteLink','nt','c','','','']]},
'component':{n:[
 ['wa','component',30,60,190,110,'WebApp',{}],['os','component',340,60,210,110,'OrderService',{}],
 ['ps','component',340,300,210,110,'PaymentService',{}],['db','component',690,60,180,110,'Database',{}],
 ['i1','lollipop',272,103,24,0,'IOrders',{}],['i2','lollipop',433,226,24,0,'IPay',{}],['i3','lollipop',620,103,24,0,'IData',{}],
 ['nt','note',690,300,190,0,'',{tx:'Only the order service may access the database.'}]],
 e:[['assembly','os','i1','','',''],['dep','wa','i1','','',''],['assembly','ps','i2','','',''],['dep','os','i2','','',''],['assembly','db','i3','','',''],['dep','os','i3','','',''],['noteLink','nt','db','','','']]},
'composite':{n:[
 ['car','cclass',40,30,580,360,'Car',{}],
 ['en','part',100,120,160,80,'engine : Engine',{p:'car'}],['gb','part',340,120,160,80,'gearbox : Gearbox',{p:'car'}],
 ['wh','part',340,260,160,80,'wheels : Wheel[4]',{p:'car'}],
 ['pt','port',33,150,14,0,'throttle',{p:'car'}],['po','port',493,150,14,0,'out',{p:'gb'}],['pw','port',413,193,14,0,'axle',{p:'gb'}]],
 e:[['delegation','pt','en','','',''],['assembly','en','gb','shaft','',''],['assembly','pw','wh','','1','4']]},
'package':{n:[
 ['ui','package',30,40,230,150,'UI',{}],['bl','package',340,40,250,150,'Business',{}],['da','package',340,270,250,150,'Data',{}],['co','package',690,150,200,150,'Common',{}],
 ['a1','element',50,90,100,0,'LoginView',{p:'ui'}],['a2','element',130,140,100,0,'Dashboard',{p:'ui'}],
 ['b1','element',360,90,110,0,'OrderService',{p:'bl'}],['b2','element',440,140,110,0,'Pricing',{p:'bl'}],
 ['d1','element',360,320,110,0,'OrderRepo',{p:'da'}],['c1','element',710,200,110,0,'Logger',{p:'co'}]],
 e:[['dep','ui','bl','','',''],['dep','bl','da','','',''],['import','bl','co','','',''],['access','da','co','','','']]},
'deployment':{n:[
 ['cl','device',30,50,240,180,'Client Device',{}],['ws','execenv',420,30,320,220,'Web Server',{}],['dbs','device',420,330,320,150,'DB Server',{}],
 ['a1','artifact',70,110,150,0,'app.apk',{p:'cl'}],['a2','artifact',460,100,140,0,'api.war',{p:'ws'}],['a3','artifact',610,100,120,0,'config.yml',{p:'ws'}],['a4','artifact',470,390,140,0,'orders.db',{p:'dbs'}],
 ['cm','component',40,330,190,100,'Order API',{}]],
 e:[['comm','cl','ws','HTTPS','',''],['comm','ws','dbs','JDBC','',''],['manifest','a2','cm','','','']]},
'profile':{n:[
 ['mc','metaclass',70,50,160,0,'Class',{}],['mk','metaclass',70,290,160,0,'Component',{}],
 ['sv','stereotype',400,30,220,0,'Service',{a:['timeout: Integer','stateless: Boolean']}],
 ['en','stereotype',400,170,220,0,'Entity',{a:['table: String']}],
 ['sc','stereotype',400,310,220,0,'Gateway',{a:['scope: Scope']}],
 ['se','enum',700,310,160,0,'Scope',{a:['PUBLIC','PRIVATE']}],
 ['nt','note',700,60,190,0,'',{tx:'{ self.timeout > 0 }'}]],
 e:[['extension','sv','mc'],['extension','en','mc'],['extension','sc','mk'],['assoc','sc','se'],['noteLink','nt','sv']]}
};


K.lollipop.fix=1;K.lollipop.h=24;K.port.fix=1;K.port.h=14;
Object.assign(K,{
 actor:{l:'Actor',sh:'actor',w:70,h:92,fix:1,nm:'Actor'},
 usecase:{l:'Use case',sh:'uc',w:190,h:56,fh:1,nm:'Use case'},
 system:{l:'System boundary',sh:'frame',w:420,h:320,box:1,nm:'System'},
 init:{l:'Initial node',sh:'init',w:22,h:22,fix:1,nm:''},
 fin:{l:'Final node',sh:'fin',w:26,h:26,fix:1,nm:''},
 ffin:{l:'Flow final',sh:'ffin',w:24,h:24,fix:1,nm:''},
 action:{l:'Action',sh:'act',w:140,h:44,fh:1,nm:'Action'},
 decision:{l:'Decision / merge / choice',sh:'dia',w:40,h:40,fix:1,nm:''},
 bar:{l:'Fork / join bar',sh:'bar',w:120,h:8,fh:1,nm:''},
 objnode:{l:'Object node',sh:'plain',w:120,h:40,fh:1,nm:'Object'},
 sendsig:{l:'Send signal',sh:'sig',sg:'send',w:140,h:44,fh:1,nm:'Signal'},
 acceptev:{l:'Accept event',sh:'sig',sg:'accept',w:140,h:44,fh:1,nm:'Event'},
 lane:{l:'Swimlane / partition',sh:'lane',w:240,h:420,box:1,nm:'Partition'},
 state:{l:'State',sh:'state',w:150,h:80,box:1,nm:'State',al:'Internal activities (entry / …)'},
 hist:{l:'History state',sh:'hist',w:26,h:26,fix:1,nm:''},
 lifeline:{l:'Lifeline',sh:'life',w:130,h:360,fh:1,nm:'obj : Class'},
 actorlife:{l:'Actor lifeline',sh:'life',act:1,w:80,h:380,fh:1,nm:'Actor'},
 activation:{l:'Activation bar',sh:'plain2',w:12,h:80,fh:1,nm:''},
 fragment:{l:'Combined fragment',sh:'frag',w:300,h:140,fh:1,st:'alt',nm:'[condition]',al:'Other operands (guards, one per line)'},
 ref:{l:'Interaction use (ref)',sh:'ref',w:150,h:50,fh:1,nm:'Interaction'},
 sdframe:{l:'Interaction frame (sd)',sh:'frag',sd:1,w:420,h:300,fh:1,nm:'Interaction'},
 timeline:{l:'Timing lifeline',sh:'tl',w:700,nm:'Lifeline',al:'States (top to bottom)',ml:'Transitions (time state, one per line)'}
});
Object.assign(E,{
 flow:{l:'Control flow',me:'open',self:1},trans:{l:'Transition',me:'open',self:1},
 include:{l:'Include',dash:'7 4',me:'open',st:'include'},extend:{l:'Extend',dash:'7 4',me:'open',st:'extend'},
 sync:{l:'Synchronous message',me:'fill',seq:1,self:1},async:{l:'Asynchronous message',me:'open',seq:1,self:1},
 reply:{l:'Reply',dash:'7 4',me:'open',seq:1,self:1},create:{l:'Create message',dash:'7 4',me:'open',seq:1,st:'create'},
 cmsg:{l:'Numbered message',cm:1},tmsg:{l:'Timing message',me:'open'}
});
DIAGS.forEach(function(d){d.g='Structural'});
DIAGS.push(
 {k:'usecase',g:'Behavioral',l:'Use case',n:['actor','usecase','system','note'],e:['assoc','include','extend','inherit','dep','noteLink'],h:'Actors and the use cases they take part in. Drop use cases onto the system boundary to nest them.'},
 {k:'activity',g:'Behavioral',l:'Activity',n:['init','fin','ffin','action','decision','bar','objnode','sendsig','acceptev','lane','note'],e:['flow','noteLink'],h:'Workflow of actions with decisions, forks / joins and swimlanes. Label a control flow with a guard such as [paid].'},
 {k:'state',g:'Behavioral',l:'State machine',n:['init','fin','state','decision','hist','bar','note'],e:['trans','noteLink'],h:'States and transitions (event [guard] / action). Drop states into a state to make it composite; click the same state twice for a self-transition.'},
 {k:'sequence',g:'Behavioral',l:'Sequence',n:['actorlife','lifeline','activation','fragment','ref','sdframe','note'],e:['sync','async','reply','create','noteLink'],h:'Messages between lifelines over time. After picking a message type click the sender, then the receiver at the height you want. Drag a message up or down to reorder; click the same lifeline twice for a self-message.'},
 {k:'communication',g:'Behavioral',l:'Communication',n:['actor','object','note'],e:['link','cmsg','noteLink'],h:'Objects connected by links, with numbered messages shown beside each link (1: call(), 1.1: …).'},
 {k:'overview',g:'Behavioral',l:'Interaction overview',n:['init','fin','ffin','decision','bar','ref','sdframe','note'],e:['flow','noteLink'],h:'Control flow between interaction uses (ref frames), with decisions, forks and joins.'},
 {k:'timing',g:'Behavioral',l:'Timing',n:['timeline','note'],e:['tmsg','noteLink'],h:'State changes over time. Edit a lifeline’s states and “time state” transitions in the properties panel; resize it to change the time scale.'}
);
TPL.usecase={n:[
 ['u1','actor',50,110,0,0,'Customer',{}],['u2','actor',50,290,0,0,'Admin',{}],['pg','actor',780,170,0,0,'Payment gateway',{}],
 ['sys','system',200,30,520,400,'Online Shop',{}],
 ['c1','usecase',260,80,190,56,'Browse catalog',{p:'sys'}],['c6','usecase',520,80,170,56,'Track order',{p:'sys'}],
 ['c2','usecase',260,190,190,56,'Place order',{p:'sys'}],['c3','usecase',520,190,160,56,'Pay',{p:'sys'}],
 ['c4','usecase',260,310,190,56,'Manage products',{p:'sys'}],['c5','usecase',520,310,170,56,'Apply coupon',{p:'sys'}]],
 e:[['assoc','u1','c1'],['assoc','u1','c2'],['assoc','u1','c6'],['include','c2','c3'],['extend','c5','c2'],['assoc','u2','c4'],['assoc','pg','c3']]};
TPL.activity={n:[
 ['l1','lane',30,20,250,470,'Customer',{}],['l2','lane',280,20,250,470,'Shop',{}],['l3','lane',530,20,250,470,'Warehouse',{}],
 ['i','init',144,60,0,0,'',{p:'l1'}],['a1','action',85,110,140,44,'Select items',{p:'l1'}],['a2','action',85,190,140,44,'Place order',{p:'l1'}],
 ['a3','action',335,190,140,44,'Validate payment',{p:'l2'}],['d','decision',385,275,0,0,'paid?',{p:'l2'}],
 ['a4','action',585,280,140,44,'Pick & pack',{p:'l3'}],['a6','action',585,370,140,44,'Ship order',{p:'l3'}],['fi','fin',642,440,0,0,'',{p:'l3'}],
 ['a5','action',335,370,140,44,'Cancel order',{p:'l2'}],['ff','ffin',393,440,0,0,'',{p:'l2'}]],
 e:[['flow','i','a1'],['flow','a1','a2'],['flow','a2','a3'],['flow','a3','d'],['flow','d','a4','[paid]'],['flow','d','a5','[declined]'],['flow','a4','a6'],['flow','a6','fi'],['flow','a5','ff']]};
TPL.state={n:[
 ['i0','init',50,100,0,0,'',{}],['idle','state',130,60,170,90,'Idle',{a:['entry / initialise()','exit / release()']}],
 ['act','state',440,30,380,270,'Active',{}],['ci','init',470,80,0,0,'',{p:'act'}],
 ['run','state',510,110,140,64,'Running',{a:['do / process()'],p:'act'}],['pau','state',690,110,110,64,'Paused',{p:'act'}],
 ['fe','fin',200,250,0,0,'',{}],['nt','note',130,330,210,60,'',{tx:'Active is a composite state containing Running and Paused.'}]],
 e:[['trans','i0','idle'],['trans','idle','act','start [ready]'],['trans','act','idle','stop'],['trans','ci','run'],['trans','run','pau','pause'],['trans','pau','run','resume'],['trans','run','run','tick / count++'],['trans','idle','fe','shutdown']]};
TPL.sequence={n:[
 ['fr','sdframe',20,20,740,470,'Checkout',{}],
 ['us','actorlife',60,50,80,400,'Customer',{}],['ui','lifeline',210,50,130,400,'ui : ShopUI',{}],['ct','lifeline',400,50,130,400,'cart : Cart',{}],['py','lifeline',590,50,130,400,'pay : Payment',{}],
 ['a1','activation',269,160,12,250,'',{}],['a2','activation',459,205,12,50,'',{}],['a3','activation',649,295,12,70,'',{}],
 ['fg','fragment',200,275,530,110,'[payment required]',{st:'opt'}]],
 e:[['sync','us','ui','checkout()','','',160],['sync','ui','ct','getItems()','','',210],['reply','ct','ui','items','','',250],['sync','ui','py','charge(total)','','',305],['reply','py','ui','receipt','','',355],['reply','ui','us','confirmation','','',405]]};
TPL.communication={n:[
 ['us','actor',40,120,0,0,'Customer',{}],['ui','object',300,60,170,0,'ui : ShopUI',{}],['ct','object',300,300,170,0,'cart : Cart',{}],['py','object',620,170,170,0,'pay : Payment',{}]],
 e:[['link','us','ui'],['link','ui','ct'],['link','ui','py'],['cmsg','us','ui','1: checkout()'],['cmsg','ui','ct','2: getItems()'],['cmsg','ct','ui','3: items'],['cmsg','ui','py','4: charge()'],['cmsg','py','ui','5: receipt']]};
TPL.overview={n:[
 ['i','init',59,30,0,0,'',{}],['r1','ref',30,90,140,50,'Login',{}],['d1','decision',80,175,0,0,'ok?',{}],
 ['r2','ref',30,250,140,50,'Browse items',{}],['r3','ref',250,170,140,50,'Show error',{}],
 ['b1','bar',30,340,300,8,'',{}],['r4','ref',30,380,140,50,'Checkout',{}],['r5','ref',190,380,140,50,'Update stats',{}],
 ['b2','bar',30,470,300,8,'',{}],['fi','fin',167,505,0,0,'',{}],['ff','ffin',308,255,0,0,'',{}],
 ['nt','note',480,90,230,70,'',{tx:'Each ref frame stands for a full sequence diagram of the same name.'}]],
 e:[['flow','i','r1'],['flow','r1','d1'],['flow','d1','r2','[ok]'],['flow','d1','r3','[failed]'],['flow','r2','b1'],['flow','b1','r4'],['flow','b1','r5'],['flow','r4','b2'],['flow','r5','b2'],['flow','b2','fi'],['flow','r3','ff'],['noteLink','nt','r5']]};
TPL.timing={n:[
 ['c','timeline',30,40,760,0,'Client',{a:['Idle','Waiting','Done'],m:['0 Idle','15 Waiting','55 Done','80 Idle']}],
 ['sv','timeline',30,240,760,0,'Server',{a:['Idle','Busy'],m:['0 Idle','20 Busy','50 Idle','80 Busy']}],
 ['nt','note',30,400,260,50,'',{tx:'Time unit = milliseconds.'}]],
 e:[['tmsg','c','sv','request']]};

/* ---------- state ---------- */
var docs={},cur='class',views={},undo={},redo={},sel=[],tool=null,linkFrom=null,snapOn=true,drag=null,pBefore=null,palCount=0;
var svg=$('uml-svg'),vp,layer;

function doc(){return docs[cur]}
function find(id){var d=doc();for(var i=0;i<d.nodes.length;i++)if(d.nodes[i].id===id)return d.nodes[i];return null}
function findE(id){var d=doc();for(var i=0;i<d.edges.length;i++)if(d.edges[i].id===id)return d.edges[i];return null}
function uid(p){var d=doc();d.uid++;return p+d.uid}
function mk(kind,x,y,o){var k=K[kind];o=o||{};return {id:null,kind:kind,x:x,y:y,w:o.w||k.w,h:o.h||k.h||0,name:o.name!=null?o.name:k.nm,stereo:o.st!=null?o.st:(k.st||''),attrs:o.a||[],methods:o.m||[],text:o.tx!=null?o.tx:(k.tx||''),color:o.c||'',abs:!!k.abs,parent:null}}
function build(key){
  var t=TPL[key],d={nodes:[],edges:[],uid:0},map={};docs[key]=d;
  t.n.forEach(function(r){var n=mk(r[1],r[2],r[3],{w:r[4]||undefined,h:r[5]||undefined,name:r[6],a:r[7].a,m:r[7].m,tx:r[7].tx});n.id='n'+(++d.uid);map[r[0]]=n;d.nodes.push(n)});
  t.n.forEach(function(r){if(r[7].p)map[r[0]].parent=map[r[7].p].id});
  t.e.forEach(function(r){d.edges.push({id:'e'+(++d.uid),kind:r[0],from:map[r[1]].id,to:map[r[2]].id,label:r[3]||'',m1:r[4]||'',m2:r[5]||'',y:r[6]||0})});
  return d;
}
function snap(){var d=doc();return JSON.stringify(d)}
function restore(s){docs[cur]=JSON.parse(s)}
function stack(m){return m[cur]||(m[cur]=[])}
function commit(before,msg){if(snap()!==before){stack(undo).push(before);if(undo[cur].length>100)undo[cur].shift();redo[cur]=[]}save();if(msg)status(msg);bar()}
function status(m){$('uml-status').textContent=m}
function save(){try{localStorage.setItem(KEY,JSON.stringify({cur:cur,docs:docs}))}catch(e){}}

/* ---------- geometry ---------- */
function wrap(text,w){var mc=Math.max(6,Math.floor((w-16)/6)),out=[];String(text||'').split('\n').forEach(function(par){var cur='';par.split(' ').forEach(function(wd){while(wd.length>mc){if(cur){out.push(cur);cur=''}out.push(wd.slice(0,mc));wd=wd.slice(mc)}if((cur+' '+wd).trim().length>mc){out.push(cur);cur=wd}else cur=(cur+' '+wd).trim()});out.push(cur)});return out.slice(0,30)}
function comps(n){var k=K[n.kind],hdr=n.stereo?40:26;return {hdr:hdr,a:k.comps>=1?Math.max(1,nz(n.attrs).length)*16+8:0,m:k.comps>=2?Math.max(1,nz(n.methods).length)*16+8:0}}
function H(n){var k=K[n.kind];if(k.fix)return k.h;switch(k.sh){case 'tl':return 26+Math.max(2,nz(n.attrs).length)*34+24;case 'cls':var c=comps(n);return c.hdr+c.a+c.m;case 'obj':var s=nz(n.attrs).length;return 28+(s?s*16+8:0);case 'note':return Math.max(36,wrap(n.text,n.w).length*15+16);case 'art':return 52;case 'lol':return 24;case 'port':return 14;default:return n.h}}
function rc(n){return {x:n.x,y:n.y,w:n.w,h:H(n)}}
function ctr(n){var r=rc(n);return {x:r.x+r.w/2,y:r.y+r.h/2}}
function clip(r,from,to){var cx=r.x+r.w/2,cy=r.y+r.h/2,dx=to.x-from.x,dy=to.y-from.y;if(!dx&&!dy)return {x:cx,y:cy};var sx=dx?(r.w/2)/Math.abs(dx):1e9,sy=dy?(r.h/2)/Math.abs(dy):1e9,s=Math.min(sx,sy);return {x:cx+dx*s,y:cy+dy*s}}
function depth(n){var d=0,p=n;while(p&&p.parent){p=find(p.parent);d++;if(d>20)break}return d}
function desc(n,acc){acc=acc||[];doc().nodes.forEach(function(c){if(c.parent===n.id){acc.push(c);desc(c,acc)}});return acc}
function isBox(n){return !!K[n.kind].box}
function snapv(v){return snapOn?Math.round(v/10)*10:Math.round(v)}

function adopt(n){
  var d=doc(),best=null,ba=1e18,r=rc(n),c=ctr(n),ex=desc(n).concat([n]);
  if(K[n.kind].sh==='port'){
    d.nodes.forEach(function(p){if(!isBox(p)||ex.indexOf(p)>=0)return;var q=rc(p),m=14;
      if(c.x<q.x-m||c.x>q.x+q.w+m||c.y<q.y-m||c.y>q.y+q.h+m)return;
      if(c.x>q.x+m&&c.x<q.x+q.w-m&&c.y>q.y+m&&c.y<q.y+q.h-m)return;
      var a=q.w*q.h;if(a<ba){ba=a;best=p}});
    if(best){var q=rc(best),dl=Math.abs(c.x-q.x),dr=Math.abs(c.x-q.x-q.w),dt=Math.abs(c.y-q.y),db=Math.abs(c.y-q.y-q.h),mn=Math.min(dl,dr,dt,db);
      if(mn===dl)n.x=q.x-r.w/2;else if(mn===dr)n.x=q.x+q.w-r.w/2;else if(mn===dt)n.y=q.y-r.h/2;else n.y=q.y+q.h-r.h/2;
      if(mn===dl||mn===dr)n.y=Math.min(Math.max(n.y,q.y),q.y+q.h-r.h)}
    n.parent=best?best.id:null;return;
  }
  d.nodes.forEach(function(p){if(!isBox(p)||ex.indexOf(p)>=0)return;var q=rc(p);if(c.x>q.x&&c.x<q.x+q.w&&c.y>q.y&&c.y<q.y+q.h){var a=q.w*q.h;if(a<ba){ba=a;best=p}}});
  n.parent=best?best.id:null;
}

/* ---------- drawing ---------- */
function defs(){
  function m(id,w,h,rx,ry,path,fill,sw){return S('marker',{id:id,markerWidth:w,markerHeight:h,refX:rx,refY:ry,orient:'auto-start-reverse',markerUnits:'userSpaceOnUse'},[S('path',{d:path,fill:fill,stroke:INK,'stroke-width':sw||1.4,'stroke-linejoin':'round'})])}
  return S('defs',{},[m('u-open',12,12,10,6,'M1,1 L10,6 L1,11','none'),m('u-tri',14,14,12,7,'M1,1 L12,7 L1,13 z','#fff'),m('u-triF',14,14,12,7,'M1,1 L12,7 L1,13 z',INK),m('u-dia',20,12,18,6,'M1,6 L9,1 L18,6 L9,11 z','#fff'),m('u-diaF',20,12,18,6,'M1,6 L9,1 L18,6 L9,11 z',INK),m('u-fill',12,12,10,6,'M1,1 L10,6 L1,11 z',INK)]);
}
function fillOf(n,def){return n.color||def||'#fff'}
function drawNode(n,ex){
  var k=K[n.kind],sh=k.sh,r=rc(n),w=r.w,h=r.h,g=S('g',{'data-id':n.id,'class':'unode',transform:'translate('+n.x+','+n.y+')'}),st=n.stereo,sw=1.4,f=fillOf(n);
  function line(y){g.appendChild(S('line',{x1:0,y1:y,x2:w,y2:y,stroke:INK,'stroke-width':1}))}
  function lines(arr,y0){nz(arr).forEach(function(s,i){g.appendChild(T(8,y0+i*16,fit(s,w,12),{size:12}))})}
  switch(k.sh){
  case 'cls':
    var c=comps(n);g.appendChild(S('rect',{width:w,height:h,fill:f,stroke:INK,'stroke-width':sw,rx:2}));
    if(st)g.appendChild(T(w/2,15,'«'+fit(st,w-10,10)+'»',{size:10,anchor:'middle',fill:'#8a6a45'}));
    g.appendChild(T(w/2,st?33:18,fit(n.name,w),{bold:1,italic:n.abs,anchor:'middle'}));
    if(k.comps>=1){line(c.hdr);lines(n.attrs,c.hdr+16)}
    if(k.comps>=2){line(c.hdr+c.a);lines(n.methods,c.hdr+c.a+16)}break;
  case 'obj':
    g.appendChild(S('rect',{width:w,height:h,fill:f,stroke:INK,'stroke-width':sw,rx:2}));
    g.appendChild(T(w/2,18,fit(n.name,w),{bold:1,under:1,anchor:'middle'}));
    if(nz(n.attrs).length){line(28);lines(n.attrs,28+16)}break;
  case 'cmp':
    g.appendChild(S('rect',{width:w,height:h,fill:fillOf(n,'#fffdf8'),stroke:INK,'stroke-width':sw,rx:3}));
    g.appendChild(S('rect',{x:w-28,y:8,width:18,height:12,fill:'#fff',stroke:INK,'stroke-width':1.1}));
    g.appendChild(S('rect',{x:w-32,y:11,width:8,height:3,fill:'#fff',stroke:INK,'stroke-width':1}));g.appendChild(S('rect',{x:w-32,y:16,width:8,height:3,fill:'#fff',stroke:INK,'stroke-width':1}));
    if(st)g.appendChild(T(10,17,'«'+fit(st,w-50,10)+'»',{size:10,fill:'#8a6a45'}));
    g.appendChild(T(10,st?35:22,fit(n.name,w-40),{bold:1}));break;
  case 'lol':
    g.appendChild(S('circle',{cx:12,cy:12,r:9,fill:f==='#fff'?'#fff':f,stroke:INK,'stroke-width':sw}));
    g.appendChild(T(12,37,fit(n.name,120),{size:11,anchor:'middle'}));break;
  case 'port':
    g.appendChild(S('rect',{width:14,height:14,fill:n.color||'#f3ca84',stroke:INK,'stroke-width':sw}));
    var par=n.parent?find(n.parent):null,left=par&&(n.x+7>par.x+rc(par).w/2);
    g.appendChild(T(left?-4:18,left?-4:-3,fit(n.name,90,11),{size:11,anchor:left?'end':'start',halo:1}));break;
  case 'frame':
    g.appendChild(S('rect',{width:w,height:h,fill:fillOf(n,'#fffdf8'),stroke:INK,'stroke-width':sw,rx:3}));
    g.appendChild(n.kind==='system'?T(w/2,22,fit(n.name,w-20),{bold:1,size:13,anchor:'middle'}):T(12,22,fit(n.name,w-20),{bold:1,size:13}));
    if(st)g.appendChild(T(12,36,'«'+st+'»',{size:10,fill:'#8a6a45'}));break;
  case 'part':
    g.appendChild(S('rect',{width:w,height:h,fill:fillOf(n,'#fff'),stroke:INK,'stroke-width':sw,rx:2}));
    g.appendChild(T(10,20,fit(n.name,w-14),{bold:1}));
    if(st)g.appendChild(T(10,34,'«'+st+'»',{size:10,fill:'#8a6a45'}));break;
  case 'pkg':
    var tw=Math.min(w,Math.max(70,n.name.length*7+22));
    g.appendChild(S('rect',{x:0,y:0,width:tw,height:20,fill:fillOf(n,'#faf0de'),stroke:INK,'stroke-width':sw}));
    g.appendChild(S('rect',{x:0,y:20,width:w,height:h-20,fill:fillOf(n,'#fffdf8'),stroke:INK,'stroke-width':sw}));
    g.appendChild(T(8,14,fit(n.name,tw),{bold:1,size:12}));
    if(st)g.appendChild(T(8,36,'«'+st+'»',{size:10,fill:'#8a6a45'}));break;
  case 'n3d':
    g.appendChild(S('polygon',{points:'0,12 12,0 '+w+',0 '+(w-12)+',12',fill:'#efe6dd',stroke:INK,'stroke-width':sw,'stroke-linejoin':'round'}));
    g.appendChild(S('polygon',{points:(w-12)+',12 '+w+',0 '+w+','+(h-12)+' '+(w-12)+','+h,fill:'#e4d4be',stroke:INK,'stroke-width':sw,'stroke-linejoin':'round'}));
    g.appendChild(S('rect',{x:0,y:12,width:w-12,height:h-12,fill:fillOf(n,'#fffdf8'),stroke:INK,'stroke-width':sw}));
    if(st)g.appendChild(T(10,28,'«'+st+'»',{size:10,fill:'#8a6a45'}));
    g.appendChild(T(10,st?44:30,fit(n.name,w-30),{bold:1}));break;
  case 'art':
    g.appendChild(S('rect',{width:w,height:h,fill:fillOf(n,'#fff'),stroke:INK,'stroke-width':sw,rx:2}));
    g.appendChild(S('path',{d:'M'+(w-20)+',6 h10 l6,6 v12 h-16 z M'+(w-10)+',6 v6 h6',fill:'#faf0de',stroke:INK,'stroke-width':1}));
    g.appendChild(T(8,18,'«'+fit(st||'artifact',w-40,10)+'»',{size:10,fill:'#8a6a45'}));
    g.appendChild(T(8,38,fit(n.name,w-10),{bold:1}));break;
  case 'actor':
    g.appendChild(S('circle',{cx:w/2,cy:12,r:9,fill:f,stroke:INK,'stroke-width':sw}));
    [[w/2,21,w/2,50],[w/2-16,31,w/2+16,31],[w/2,50,w/2-13,70],[w/2,50,w/2+13,70]].forEach(function(l){g.appendChild(S('line',{x1:l[0],y1:l[1],x2:l[2],y2:l[3],stroke:INK,'stroke-width':sw,'stroke-linecap':'round'}))});
    g.appendChild(T(w/2,87,fit(n.name,w+60),{anchor:'middle',bold:1}));break;
  case 'uc':
    g.appendChild(S('ellipse',{cx:w/2,cy:h/2,rx:w/2,ry:h/2,fill:fillOf(n,'#fff'),stroke:INK,'stroke-width':sw}));
    var ul=wrap(n.name,w-30).slice(0,3);ul.forEach(function(s,i){g.appendChild(T(w/2,h/2+4-(ul.length-1)*7+i*14,s,{anchor:'middle'}))});break;
  case 'init':g.appendChild(S('circle',{cx:11,cy:11,r:11,fill:INK}));break;
  case 'fin':g.appendChild(S('circle',{cx:13,cy:13,r:12,fill:'#fff',stroke:INK,'stroke-width':sw}));g.appendChild(S('circle',{cx:13,cy:13,r:7,fill:INK}));break;
  case 'ffin':g.appendChild(S('circle',{cx:12,cy:12,r:11,fill:'#fff',stroke:INK,'stroke-width':sw}));g.appendChild(S('path',{d:'M7,7 L17,17 M17,7 L7,17',stroke:INK,'stroke-width':sw,'stroke-linecap':'round'}));break;
  case 'hist':g.appendChild(S('circle',{cx:13,cy:13,r:12,fill:f,stroke:INK,'stroke-width':sw}));g.appendChild(T(13,18,'H',{bold:1,anchor:'middle'}));break;
  case 'dia':
    g.appendChild(S('polygon',{points:(w/2)+',0 '+w+','+(h/2)+' '+(w/2)+','+h+' 0,'+(h/2),fill:fillOf(n,'#fff'),stroke:INK,'stroke-width':sw,'stroke-linejoin':'round'}));
    if(n.name)g.appendChild(T(w+6,h/2+4,fit(n.name,110),{size:11}));break;
  case 'act':
    g.appendChild(S('rect',{width:w,height:h,rx:14,fill:fillOf(n,'#fff'),stroke:INK,'stroke-width':sw}));
    var al=wrap(n.name,w-8).slice(0,4);al.forEach(function(s,i){g.appendChild(T(w/2,h/2+4-(al.length-1)*7+i*14,s,{anchor:'middle'}))});break;
  case 'plain':
    g.appendChild(S('rect',{width:w,height:h,fill:fillOf(n,'#fff'),stroke:INK,'stroke-width':sw}));
    g.appendChild(T(w/2,h/2+4,fit(n.name,w),{anchor:'middle'}));break;
  case 'plain2':g.appendChild(S('rect',{width:w,height:h,fill:fillOf(n,'#fff'),stroke:INK,'stroke-width':sw}));break;
  case 'bar':g.appendChild(S('rect',{width:w,height:h,fill:n.color&&n.color!=='#fff'?INK:INK,rx:2}));break;
  case 'sig':
    g.appendChild(S('polygon',{points:k.sg==='send'?'0,0 '+(w-16)+',0 '+w+','+(h/2)+' '+(w-16)+','+h+' 0,'+h:'0,0 '+w+',0 '+w+','+h+' 0,'+h+' 16,'+(h/2),fill:fillOf(n,'#fff'),stroke:INK,'stroke-width':sw,'stroke-linejoin':'round'}));
    g.appendChild(T(w/2+(k.sg==='send'?-4:6),h/2+4,fit(n.name,w-30),{anchor:'middle'}));break;
  case 'lane':
    g.appendChild(S('rect',{width:w,height:h,fill:fillOf(n,'#fffdf8'),stroke:INK,'stroke-width':sw}));
    g.appendChild(S('rect',{width:w,height:26,fill:'#faf0de',stroke:INK,'stroke-width':sw}));
    g.appendChild(T(w/2,18,fit(n.name,w),{bold:1,anchor:'middle'}));break;
  case 'state':
    g.appendChild(S('rect',{width:w,height:h,rx:14,fill:fillOf(n,'#fffdf8'),stroke:INK,'stroke-width':sw}));
    g.appendChild(T(w/2,19,fit(n.name,w-20),{bold:1,anchor:'middle'}));
    if(nz(n.attrs).length){g.appendChild(S('line',{x1:0,y1:27,x2:w,y2:27,stroke:INK,'stroke-width':1}));lines(n.attrs,27+15)}break;
  case 'life':
    var ls;
    if(k.act){
      g.appendChild(S('circle',{cx:w/2,cy:12,r:9,fill:f,stroke:INK,'stroke-width':sw}));
      [[w/2,21,w/2,50],[w/2-16,31,w/2+16,31],[w/2,50,w/2-13,70],[w/2,50,w/2+13,70]].forEach(function(l){g.appendChild(S('line',{x1:l[0],y1:l[1],x2:l[2],y2:l[3],stroke:INK,'stroke-width':sw,'stroke-linecap':'round'}))});
      g.appendChild(T(w/2,87,fit(n.name,w+60),{anchor:'middle',bold:1}));ls=96;
    }else{
      g.appendChild(S('rect',{width:w,height:36,fill:fillOf(n,'#fff'),stroke:INK,'stroke-width':sw,rx:2}));
      g.appendChild(T(w/2,23,fit(n.name,w),{bold:1,anchor:'middle'}));ls=36;
    }
    g.appendChild(S('line',{x1:w/2,y1:ls,x2:w/2,y2:h,stroke:INK,'stroke-width':1.2,'stroke-dasharray':'7 5'}));
    g.appendChild(S('rect',{x:0,y:0,width:w,height:ls,fill:'#fff','fill-opacity':0.001}));
    g.appendChild(S('rect',{x:w/2-9,y:ls,width:18,height:Math.max(1,h-ls),fill:'#fff','fill-opacity':0.001}));break;
  case 'frag':
    g.appendChild(S('rect',{width:w,height:h,fill:'none',stroke:INK,'stroke-width':1.3,'pointer-events':'stroke'}));
    var op=k.sd?'sd '+n.name:(n.stereo||'alt'),tw=Math.max(44,Math.min(w,op.length*7+20));
    g.appendChild(S('polygon',{points:'0,0 '+tw+',0 '+tw+',12 '+(tw-8)+',21 0,21',fill:'#faf0de',stroke:INK,'stroke-width':1.2}));
    g.appendChild(T(6,15,fit(op,tw),{bold:1,size:11}));
    if(!k.sd){
      if(n.name)g.appendChild(T(8,38,fit(n.name,w-16,11),{size:11}));
      var ops=nz(n.attrs);ops.forEach(function(s,i){var y=h*(i+1)/(ops.length+1);g.appendChild(S('line',{x1:0,y1:y,x2:w,y2:y,stroke:INK,'stroke-width':1.1,'stroke-dasharray':'7 4'}));g.appendChild(T(8,y+16,fit(s,w-16,11),{size:11}))});
    }break;
  case 'ref':
    g.appendChild(S('rect',{width:w,height:h,fill:fillOf(n,'#fff'),stroke:INK,'stroke-width':sw}));
    g.appendChild(S('polygon',{points:'0,0 34,0 34,11 27,18 0,18',fill:'#faf0de',stroke:INK,'stroke-width':1.2}));
    g.appendChild(T(5,13,'ref',{bold:1,size:11}));g.appendChild(T(w/2,h/2+9,fit(n.name,w),{anchor:'middle'}));break;
  case 'tl':
    var st=nz(n.attrs);if(st.length<2)st=['Low','High'];
    var pts=nz(n.methods).map(function(l){var m=/^\s*(-?[0-9]*\.?[0-9]+)\s+(.+)$/.exec(l);return m?{t:+m[1],s:m[2].trim()}:null}).filter(Boolean).sort(function(a,b){return a.t-b.t});
    var lw=100,tmax=Math.max(10,(pts.length?pts[pts.length-1].t:10)*1.15),px=function(t){return lw+t*(w-lw-14)/tmax},rh=34,ry=function(s){var i=st.indexOf(s);if(i<0)i=0;return 26+i*rh+rh/2};
    g.appendChild(S('rect',{width:w,height:h,fill:fillOf(n,'#fffdf8'),stroke:INK,'stroke-width':sw,rx:3}));
    g.appendChild(T(10,17,fit(n.name,w-20),{bold:1}));
    st.forEach(function(s,i){var y=26+i*rh+rh/2;g.appendChild(S('line',{x1:lw,y1:y,x2:w-8,y2:y,stroke:'#e4d4be','stroke-width':1,'stroke-dasharray':'3 4'}));g.appendChild(T(lw-8,y+4,fit(s,lw-10,11),{size:11,anchor:'end'}))});
    var axY=h-20;g.appendChild(S('line',{x1:lw,y1:axY,x2:w-8,y2:axY,stroke:INK,'stroke-width':1}));
    var stp=tmax>200?50:tmax>100?20:tmax>50?10:tmax>20?5:2;
    for(var t=0;t<=tmax;t+=stp){g.appendChild(S('line',{x1:px(t),y1:axY,x2:px(t),y2:axY+4,stroke:INK}));g.appendChild(T(px(t),axY+15,String(t),{size:10,anchor:'middle',fill:'#8a6a45'}))}
    if(pts.length){
      var d='M'+px(pts[0].t)+','+ry(pts[0].s);
      for(var i2=1;i2<pts.length;i2++)d+=' H'+px(pts[i2].t)+' V'+ry(pts[i2].s);
      d+=' H'+px(tmax);
      g.appendChild(S('path',{d:d,fill:'none',stroke:'#b45309','stroke-width':2.2,'stroke-linejoin':'round'}));
    }else g.appendChild(T(lw+10,26+rh/2,'add transitions, e.g. “0 Idle”',{size:11,fill:'#8a9299'}));
    break;
  case 'note':
    g.appendChild(S('polygon',{points:'0,0 '+(w-14)+',0 '+w+',14 '+w+','+h+' 0,'+h,fill:fillOf(n,'#fff7e0'),stroke:INK,'stroke-width':1.2}));
    g.appendChild(S('path',{d:'M'+(w-14)+',0 v14 h14',fill:'none',stroke:INK,'stroke-width':1.2}));
    wrap(n.text,w).forEach(function(s,i){g.appendChild(T(8,20+i*15,s,{size:11}))});break;
  }
  if(sh!=='life'&&sh!=='frag')g.insertBefore(S('rect',{width:Math.max(w,1),height:Math.max(h,1),fill:'#fff','fill-opacity':0.001}),g.firstChild);
  if(!ex){
    var on=sel.indexOf(n.id)>=0,lf=linkFrom===n.id;
    if(on||lf)g.appendChild(S('rect',{x:-4,y:-4,width:w+8,height:h+8,fill:'none',stroke:lf?'#45806b':'#b45309','stroke-width':2,'stroke-dasharray':'5 3',rx:4,'pointer-events':'none'}));
    if(on&&sel.length===1&&!K[n.kind].fix)g.appendChild(S('rect',{x:w-6,y:h-6,width:12,height:12,fill:'#b45309',stroke:'#fff','stroke-width':1.5,rx:2,'data-h':'resize',style:'cursor:nwse-resize'}));
  }
  return g;
}
function exitPt(n,P,ux,uy){
  var sh=K[n.kind].sh,r=rc(n),cx=r.x+r.w/2,cy=r.y+r.h/2,hw=r.w/2,hh=r.h/2,t;
  var qx=Math.max(-hw*.98,Math.min(hw*.98,P.x-cx)),qy=Math.max(-hh*.98,Math.min(hh*.98,P.y-cy));
  if(/^(uc|init|fin|ffin|hist|lol)$/.test(sh)){var vx=ux/hw,vy=uy/hh,a=vx*vx+vy*vy,b=2*((qx/hw)*vx+(qy/hh)*vy),c=(qx/hw)*(qx/hw)+(qy/hh)*(qy/hh)-1,dc=Math.max(0,b*b-4*a*c);t=a?(-b+Math.sqrt(dc))/(2*a):0}
  else if(sh==='dia'){var sx=ux>=0?1:-1,sy=uy>=0?1:-1,den=sx*ux/hw+sy*uy/hh;t=den?(1-sx*qx/hw-sy*qy/hh)/den:0}
  else{var tx=ux>0?(hw-qx)/ux:ux<0?(-hw-qx)/ux:1e9,ty=uy>0?(hh-qy)/uy:uy<0?(-hh-qy)/uy:1e9;t=Math.min(tx,ty)}
  return {x:cx+qx+ux*t,y:cy+qy+uy*t};
}
function actOff(ln,y){var off=0;doc().nodes.forEach(function(n){if(n.kind==='activation'&&Math.abs(n.x+n.w/2-(ln.x+ln.w/2))<=12&&y>=n.y-1&&y<=n.y+n.h+1)off=Math.max(off,n.w/2)});return off}
function drawEdge(e,ex,idx,total){
  var a=find(e.from),b=find(e.to);if(!a||!b)return null;
  var kd=E[e.kind],g=S('g',{'data-id':e.id,'class':'uedge'}),on=!ex&&sel.indexOf(e.id)>=0,d,p1,p2,lab=null,ux=1,uy=0,self=a===b;
  if(kd.seq){
    var y=e.y||160,xa=a.x+a.w/2,xb=b.x+b.w/2;
    if(self){var o=actOff(a,y);p1={x:xa+o,y:y};p2={x:xa+o,y:y+20};d='M'+p1.x+','+y+' h30 v20 h-30';lab={x:xa+o+36,y:y+8,an:'start'}}
    else{var dr=xb>xa?1:-1;p1={x:xa+dr*actOff(a,y),y:y};p2={x:xb-dr*actOff(b,y),y:y};d='M'+p1.x+','+y+' L'+p2.x+','+y;lab={x:(p1.x+p2.x)/2,y:y-7,an:'middle'};ux=dr}
  }else if(self){
    var r=rc(a),y1=r.y+r.h*0.25,hh=Math.max(14,r.h*0.45);p1={x:r.x+r.w,y:y1};p2={x:r.x+r.w,y:y1+hh};d='M'+p1.x+','+y1+' h32 v'+hh+' h-32';lab={x:r.x+r.w+38,y:y1+hh/2+4,an:'start'};
  }else{
    var ca=ctr(a),cb=ctr(b),dx=cb.x-ca.x,dy=cb.y-ca.y,len=Math.sqrt(dx*dx+dy*dy)||1;ux=dx/len;uy=dy/len;
    var px=-uy,py=ux,off=kd.cm?0:(idx-(total-1)/2)*20,A={x:ca.x+px*off,y:ca.y+py*off},B={x:cb.x+px*off,y:cb.y+py*off};
    p1=exitPt(a,A,ux,uy);p2=exitPt(b,B,-ux,-uy);d='M'+p1.x+','+p1.y+' L'+p2.x+','+p2.y;
    lab={x:(p1.x+p2.x)/2,y:(p1.y+p2.y)/2-6,an:'middle'};
  }
  if(kd.cm){
    /* numbered message: small arrow + label beside the link line */
    var px2=-uy,py2=ux,o2=14+idx*17,mx=(p1.x+p2.x)/2+px2*o2,my=(p1.y+p2.y)/2+py2*o2;
    g.appendChild(S('polygon',{points:(mx+ux*8)+','+(my+uy*8)+' '+(mx-ux*4+px2*5)+','+(my-uy*4+py2*5)+' '+(mx-ux*4-px2*5)+','+(my-uy*4-py2*5),fill:INK}));
    if(on)g.appendChild(S('circle',{cx:mx,cy:my,r:14,fill:'#d99b26','fill-opacity':.35}));
    g.appendChild(S('circle',{cx:mx,cy:my,r:12,fill:'#fff','fill-opacity':0.001}));
    g.appendChild(T(mx+ux*12+px2*(4+(Math.abs(px2)>.5?8:0)),my+uy*12+py2*10+4,fit(e.label,220,11),{size:11,anchor:ux>0.3?'start':ux<-0.3?'end':'middle',halo:1}));
    if(e.m1||e.m2){}
    return g;
  }
  if(on)g.appendChild(S('path',{d:d,fill:'none',stroke:'#d99b26','stroke-opacity':.45,'stroke-width':8,'stroke-linecap':'round'}));
  g.appendChild(S('path',{d:d,fill:'none',stroke:INK,'stroke-width':kd.thin?1:1.4,'stroke-dasharray':kd.dash||null,'marker-start':kd.ms?'url(#u-'+kd.ms+')':null,'marker-end':kd.me?'url(#u-'+kd.me+')':null}));
  g.appendChild(S('path',{d:d,fill:'none',stroke:'#fff','stroke-opacity':0.001,'stroke-width':14}));
  var lines=[];if(kd.st)lines.push('«'+kd.st+'»');if(e.label)lines.push(e.label);
  lines.forEach(function(s,i){g.appendChild(T(lab.x,lab.y-(lines.length-1-i)*13,fit(s,220,11),{size:11,anchor:lab.an,halo:1,fill:i===0&&kd.st?'#8a6a45':'#0f172a'}))});
  var side=(uy>0||(uy===0&&ux>0))?1:-1,px3=-uy,py3=ux;
  if(e.m1)g.appendChild(T(p1.x+ux*16+px3*11*side,p1.y+uy*16+py3*11*side+4,e.m1,{size:11,anchor:'middle',halo:1}));
  if(e.m2)g.appendChild(T(p2.x-ux*16+px3*11*side,p2.y-uy*16+py3*11*side+4,e.m2,{size:11,anchor:'middle',halo:1}));
  return g;
}
function paint(target,ex){
  var d=doc(),nodes=d.nodes.slice().sort(function(a,b){return depth(a)-depth(b)});
  nodes.forEach(function(n){target.appendChild(drawNode(n,ex))});
  var cnt={},seen={};
  d.edges.forEach(function(e){if(E[e.kind].cm)return;var k=[e.from,e.to].sort().join('|');cnt[k]=(cnt[k]||0)+1});
  d.edges.forEach(function(e){var k=[e.from,e.to].sort().join('|'),cm=E[e.kind].cm,kk=(cm?'c':'n')+k;seen[kk]=seen[kk]||0;var g=drawEdge(e,ex,seen[kk]++,cnt[k]||1);if(g)target.appendChild(g)});
}
function render(){
  var v=views[cur]||(views[cur]={tx:20,ty:20,k:1});
  svg.innerHTML='';
  svg.appendChild(defs());
  svg.appendChild(S('defs',{},[S('pattern',{id:'u-grid',width:20,height:20,patternUnits:'userSpaceOnUse'},[S('circle',{cx:1,cy:1,r:1,fill:'#e4d4be'})])]));
  svg.appendChild(S('rect',{width:'100%',height:'100%',fill:'#fffefb','data-bg':1}));
  vp=S('g',{transform:'translate('+v.tx+','+v.ty+') scale('+v.k+')'});
  vp.appendChild(S('rect',{x:-6000,y:-6000,width:12000,height:12000,fill:'url(#u-grid)','data-bg':1}));
  layer=S('g',{});vp.appendChild(layer);svg.appendChild(vp);
  paint(layer,false);
  $('uml-zoomv').textContent=Math.round(v.k*100)+'%';
  props();bar();
}
function bar(){
  var s=function(a,v){var b=document.querySelector('[data-uml="'+a+'"]');if(b)b.disabled=!!v};
  s('undo',!(undo[cur]||[]).length);s('redo',!(redo[cur]||[]).length);s('dup',!sel.length);s('del',!sel.length);
}

/* ---------- palette ---------- */
function icon(kind,isEdge){
  var a=S('svg',{viewBox:'0 0 30 16',width:30,height:16,'aria-hidden':'true'});
  if(isEdge){var kd=E[kind];a.appendChild(S('defs',{},[]));
    var l=S('line',{x1:2,y1:8,x2:kd.me?24:28,y2:8,stroke:INK,'stroke-width':1.3,'stroke-dasharray':kd.dash||null});a.appendChild(l);
    if(kd.me==='open')a.appendChild(S('path',{d:'M21,3 L28,8 L21,13',fill:'none',stroke:INK,'stroke-width':1.3}));
    if(kd.me==='fill')a.appendChild(S('path',{d:'M20,3 L28,8 L20,13z',fill:INK,stroke:INK}));
    if(kd.me==='tri')a.appendChild(S('path',{d:'M20,3 L28,8 L20,13z',fill:'#fff',stroke:INK,'stroke-width':1.3}));
    if(kd.me==='triF')a.appendChild(S('path',{d:'M20,3 L28,8 L20,13z',fill:INK,stroke:INK}));
    if(kd.ms){l.setAttribute('x1',10);a.appendChild(S('path',{d:'M2,8 L6,4 L10,8 L6,12z',fill:kd.ms==='diaF'?INK:'#fff',stroke:INK,'stroke-width':1.3}))}
    return a}
  var sh=K[kind].sh,o={fill:'#fff',stroke:INK,'stroke-width':1.2};
  if(sh==='lol')a.appendChild(S('circle',{cx:15,cy:8,r:5,fill:'#fff',stroke:INK}));
  else if(sh==='port')a.appendChild(S('rect',{x:11,y:4,width:8,height:8,fill:'#f3ca84',stroke:INK}));
  else if(sh==='pkg'){a.appendChild(S('rect',{x:4,y:1,width:12,height:4,fill:'#faf0de',stroke:INK}));a.appendChild(S('rect',{x:4,y:5,width:22,height:10,fill:'#fff',stroke:INK}))}
  else if(sh==='n3d'){a.appendChild(S('polygon',{points:'4,5 8,1 26,1 22,5',fill:'#efe6dd',stroke:INK}));a.appendChild(S('rect',{x:4,y:5,width:18,height:10,fill:'#fff',stroke:INK}));a.appendChild(S('polygon',{points:'22,5 26,1 26,11 22,15',fill:'#e4d4be',stroke:INK}))}
  else if(sh==='note')a.appendChild(S('polygon',{points:'4,1 20,1 26,6 26,15 4,15',fill:'#fff7e0',stroke:INK}));
  else if(sh==='cls'){a.appendChild(S('rect',{x:4,y:1,width:22,height:14,fill:'#fff',stroke:INK}));a.appendChild(S('line',{x1:4,y1:6,x2:26,y2:6,stroke:INK}));if(K[kind].comps>1)a.appendChild(S('line',{x1:4,y1:10,x2:26,y2:10,stroke:INK}))}
  else if(sh==='actor'){a.appendChild(S('circle',{cx:15,cy:3.5,r:2.6,fill:'#fff',stroke:INK}));a.appendChild(S('path',{d:'M15,6 V11 M10,8 H20 M15,11 L11,15 M15,11 L19,15',stroke:INK,fill:'none','stroke-width':1.1}))}
  else if(sh==='uc')a.appendChild(S('ellipse',{cx:15,cy:8,rx:11,ry:6,fill:'#fff',stroke:INK}));
  else if(sh==='init')a.appendChild(S('circle',{cx:15,cy:8,r:5,fill:INK}));
  else if(sh==='fin'){a.appendChild(S('circle',{cx:15,cy:8,r:6.5,fill:'#fff',stroke:INK}));a.appendChild(S('circle',{cx:15,cy:8,r:3.5,fill:INK}))}
  else if(sh==='ffin'){a.appendChild(S('circle',{cx:15,cy:8,r:6.5,fill:'#fff',stroke:INK}));a.appendChild(S('path',{d:'M12,5 L18,11 M18,5 L12,11',stroke:INK}))}
  else if(sh==='hist'){a.appendChild(S('circle',{cx:15,cy:8,r:6.5,fill:'#fff',stroke:INK}));a.appendChild(S('text',{x:15,y:11,'font-size':8,'text-anchor':'middle','font-weight':700,fill:INK},[]))}
  else if(sh==='dia')a.appendChild(S('polygon',{points:'15,1 23,8 15,15 7,8',fill:'#fff',stroke:INK}));
  else if(sh==='act')a.appendChild(S('rect',{x:3,y:2,width:24,height:12,rx:6,fill:'#fff',stroke:INK}));
  else if(sh==='bar')a.appendChild(S('rect',{x:3,y:6,width:24,height:4,fill:INK}));
  else if(sh==='sig')a.appendChild(S('polygon',{points:K[kind].sg==='send'?'3,2 21,2 27,8 21,14 3,14':'3,2 27,2 27,14 3,14 8,8',fill:'#fff',stroke:INK}));
  else if(sh==='lane'){a.appendChild(S('rect',{x:3,y:1,width:24,height:14,fill:'#fff',stroke:INK}));a.appendChild(S('rect',{x:3,y:1,width:24,height:4,fill:'#faf0de',stroke:INK}))}
  else if(sh==='state'){a.appendChild(S('rect',{x:3,y:2,width:24,height:12,rx:5,fill:'#fff',stroke:INK}));a.appendChild(S('line',{x1:3,y1:6,x2:27,y2:6,stroke:INK}))}
  else if(sh==='life'){a.appendChild(S('rect',{x:8,y:1,width:14,height:5,fill:'#fff',stroke:INK}));a.appendChild(S('line',{x1:15,y1:6,x2:15,y2:15,stroke:INK,'stroke-dasharray':'2 1.5'}))}
  else if(sh==='plain2')a.appendChild(S('rect',{x:12,y:1,width:6,height:14,fill:'#fff',stroke:INK}));
  else if(sh==='frag'||sh==='ref'){a.appendChild(S('rect',{x:3,y:2,width:24,height:12,fill:'none',stroke:INK}));a.appendChild(S('polygon',{points:'3,2 13,2 13,6 11,8 3,8',fill:'#faf0de',stroke:INK}))}
  else if(sh==='tl'){a.appendChild(S('rect',{x:3,y:1,width:24,height:14,fill:'#fff',stroke:INK}));a.appendChild(S('path',{d:'M5,12 H11 V5 H18 V12 H25',fill:'none',stroke:'#b45309','stroke-width':1.3}))}
  else if(sh==='plain')a.appendChild(S('rect',{x:4,y:2,width:22,height:12,fill:'#fff',stroke:INK}));
  else a.appendChild(S('rect',{x:4,y:1,width:22,height:14,fill:'#fff',stroke:INK,rx:2}));
  return a;
}
function palette(){
  var D=DIAGS.filter(function(d){return d.k===cur})[0],pn=$('uml-pn'),pe=$('uml-pe');pn.innerHTML='';pe.innerHTML='';
  D.n.forEach(function(k){var b=document.createElement('button');b.type='button';b.className='uml-pbtn';b.draggable=true;b.dataset.kind=k;b.title='Click to add, or drag onto the canvas';b.appendChild(icon(k));var s=document.createElement('span');s.textContent=K[k].l;b.appendChild(s);pn.appendChild(b)});
  D.e.forEach(function(k){var b=document.createElement('button');b.type='button';b.className='uml-pbtn edge'+(tool===k?' active':'');b.dataset.edge=k;b.appendChild(icon(k,true));var s=document.createElement('span');s.textContent=E[k].l;b.appendChild(s);pe.appendChild(b)});
  $('uml-note').textContent=D.h;
}
function setTool(t){tool=t;linkFrom=null;[].forEach.call(document.querySelectorAll('[data-edge]'),function(b){b.classList.toggle('active',b.dataset.edge===t)});$('uml-canvas').classList.toggle('linking',!!t);$('uml-hint').textContent=t?'“'+E[t].l+'”: click the source, then the target. Esc cancels.':'';render()}

/* ---------- selection / props ---------- */
function setSel(a){sel=a;render()}
function props(){
  var one=sel.length===1?(find(sel[0])||findE(sel[0])):null,isN=one&&one.kind&&K[one.kind],isE=one&&one.kind&&E[one.kind]&&!K[one.kind];
  var ae=document.activeElement,inP=ae&&ae.closest&&ae.closest('#uml-props');
  $('up-none').hidden=!!sel.length;$('up-multi').hidden=sel.length<2;$('up-node').hidden=!isN;$('up-edge').hidden=!isE;
  if(sel.length>1)$('up-multi-t').textContent=sel.length+' items selected — drag to move, Delete to remove, Ctrl+D to duplicate.';
  function setv(id,v){var el=$(id);if(!(inP&&ae===el))el.value=v}
  if(isN){
    var n=one,k=K[n.kind],sh=k.sh,box=!!k.box;
    $('up-title').textContent=k.l;
    $('up-f-name').hidden=/^(note|plain2|bar)$/.test(sh);$('up-f-stereo').hidden=/^(note|lol|port|init|fin|ffin|dia|hist|bar|plain2|actor|tl)$/.test(sh)&&!(sh==='frag');
    $('up-f-attrs').hidden=!(k.al||sh==='obj'||(sh==='cls'&&k.comps>=1));$('up-f-meth').hidden=!(k.ml||(sh==='cls'&&k.comps>=2));
    $('up-f-text').hidden=sh!=='note';$('up-f-abs').hidden=!(sh==='cls'&&(n.kind==='class'||n.kind==='abstract'));
    $('up-f-color').hidden=/^(lol|init|fin|ffin|bar)$/.test(sh);$('up-f-w').hidden=!!k.fix||sh==='plain2'&&false;$('up-f-h').hidden=!(box||k.fh);
    $('up-attrs-l').textContent=k.al||(sh==='obj'?'Slots (name = value)':n.kind==='enum'?'Literals':n.kind==='stereotype'?'Tagged values':'Attributes');
    $('up-meth-l').textContent=k.ml||'Operations';
    $('up-name-l').textContent=sh==='obj'?'Name : Class':sh==='frag'?(k.sd?'Interaction name':'Guard / name'):'Name';
    setv('up-name',n.name);setv('up-stereo',n.stereo);setv('up-attrs',(n.attrs||[]).join('\n'));setv('up-meth',(n.methods||[]).join('\n'));setv('up-text',n.text);
    setv('up-color',n.color);setv('up-w',n.w);setv('up-h',n.h);$('up-abs').checked=!!n.abs;
  }
  if(isE){
    var e=one,sl=$('up-ekind'),D=DIAGS.filter(function(d){return d.k===cur})[0],ks=D.e.slice();if(ks.indexOf(e.kind)<0)ks.push(e.kind);
    if(!(inP&&ae===sl)){sl.innerHTML=ks.map(function(x){return '<option value="'+x+'">'+E[x].l+'</option>'}).join('');sl.value=e.kind}
    var a=find(e.from),b=find(e.to);$('up-eends').textContent=(a?a.name||K[a.kind].l:'?')+'  →  '+(b?b.name||K[b.kind].l:'?');
    $('up-f-ey').hidden=!E[e.kind].seq;setv('up-ey',e.y||0);setv('up-elabel',e.label);setv('up-em1',e.m1);setv('up-em2',e.m2);
  }
}
var P=$('uml-props');
P.addEventListener('focusin',function(e){if(/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)&&!pBefore)pBefore=snap()});
P.addEventListener('focusout',function(e){if(e.target.tagName==='TEXTAREA'){var n=find(sel[0]);if(n){n.attrs=nz(n.attrs);n.methods=nz(n.methods);}}pBefore=null});
P.addEventListener('change',function(){if(pBefore!==null&&pBefore!==snap()){stack(undo).push(pBefore);redo[cur]=[]}pBefore=snap();save();bar()});
P.addEventListener('input',function(ev){
  var id=ev.target.id,v=ev.target.value,n=sel.length===1?find(sel[0]):null,e=sel.length===1?findE(sel[0]):null;
  if(n){
    if(id==='up-name')n.name=v.slice(0,80);else if(id==='up-stereo')n.stereo=v.slice(0,40);
    else if(id==='up-attrs')n.attrs=v.split('\n').slice(0,40).map(function(s){return s.slice(0,100)});
    else if(id==='up-meth')n.methods=v.split('\n').slice(0,40).map(function(s){return s.slice(0,100)});
    else if(id==='up-text')n.text=v.slice(0,400);else if(id==='up-color')n.color=v;
    else if(id==='up-abs')n.abs=ev.target.checked;
    else if(id==='up-w')n.w=Math.min(1200,Math.max(40,+v||n.w));else if(id==='up-h')n.h=Math.min(1200,Math.max(40,+v||n.h));else return;
  }else if(e){
    if(id==='up-ekind')e.kind=v;else if(id==='up-elabel')e.label=v.slice(0,60);else if(id==='up-ey')e.y=Math.min(5000,Math.max(0,+v||0));else if(id==='up-em1')e.m1=v.slice(0,12);else if(id==='up-em2')e.m2=v.slice(0,12);else return;
  }else return;
  render();
});

/* ---------- operations ---------- */
function viewCenter(){var v=views[cur],r=svg.getBoundingClientRect();return {x:(r.width/2-v.tx)/v.k,y:(r.height/2-v.ty)/v.k}}
function addNode(kind,wx,wy){
  var b=snap(),k=K[kind],c;
  if(wx==null){c=viewCenter();var o=(palCount++%6)*20;wx=c.x-k.w/2+o;wy=c.y-(k.h||60)/2+o}
  var n=mk(kind,snapv(wx),snapv(wy));n.id=uid('n');doc().nodes.push(n);adopt(n);sel=[n.id];commit(b,'Added '+k.l);render();
  var f=$('up-f-name').hidden?$('up-text'):$('up-name');if(f&&!f.closest('[hidden]')){f.focus();if(f.select)f.select()}
}
function del(){
  if(!sel.length)return;var b=snap(),d=doc();
  sel.forEach(function(id){var n=find(id);if(n){d.nodes.forEach(function(c){if(c.parent===n.id)c.parent=n.parent});d.nodes=d.nodes.filter(function(x){return x!==n});d.edges=d.edges.filter(function(e){return e.from!==n.id&&e.to!==n.id})}else d.edges=d.edges.filter(function(e){return e.id!==id})});
  sel=[];commit(b,'Deleted — Ctrl+Z to undo');render();
}
function dup(){
  if(!sel.length)return;var b=snap(),d=doc(),map={},ids=sel.filter(function(i){return find(i)});if(!ids.length){status('Select an element to duplicate.');return}
  ids.forEach(function(i){var n=JSON.parse(JSON.stringify(find(i)));map[i]=n.id=uid('n');n.x+=30;n.y+=30;d.nodes.push(n)});
  ids.forEach(function(i){var n=find(map[i]);if(n.parent&&map[n.parent])n.parent=map[n.parent]});
  d.edges.slice().forEach(function(e){if(map[e.from]&&map[e.to]){var c=JSON.parse(JSON.stringify(e));c.id=uid('e');c.from=map[e.from];c.to=map[e.to];d.edges.push(c)}});
  sel=ids.map(function(i){return map[i]});commit(b,'Duplicated');render();
}
function doUndo(){var u=stack(undo);if(!u.length)return;stack(redo).push(snap());restore(u.pop());sel=sel.filter(function(i){return find(i)||findE(i)});save();render();status('Undone')}
function doRedo(){var r=stack(redo);if(!r.length)return;stack(undo).push(snap());restore(r.pop());sel=sel.filter(function(i){return find(i)||findE(i)});save();render();status('Redone')}
function zoom(f,cx,cy){var v=views[cur],r=svg.getBoundingClientRect();cx=cx==null?r.width/2:cx;cy=cy==null?r.height/2:cy;var nk=Math.min(3,Math.max(.25,v.k*f));v.tx=cx-(cx-v.tx)*nk/v.k;v.ty=cy-(cy-v.ty)*nk/v.k;v.k=nk;vp.setAttribute('transform','translate('+v.tx+','+v.ty+') scale('+v.k+')');$('uml-zoomv').textContent=Math.round(v.k*100)+'%'}
function bounds(){var d=doc();if(!d.nodes.length)return null;var x1=1e9,y1=1e9,x2=-1e9,y2=-1e9;d.nodes.forEach(function(n){var r=rc(n);x1=Math.min(x1,r.x-20);y1=Math.min(y1,r.y-20);x2=Math.max(x2,r.x+r.w+20);y2=Math.max(y2,r.y+r.h+40)});return {x:x1,y:y1,w:x2-x1,h:y2-y1}}
function fitView(){var bb=bounds(),r=svg.getBoundingClientRect(),v=views[cur]||(views[cur]={});if(!bb){v.tx=20;v.ty=20;v.k=1}else{var k=Math.min(1,(r.width-40)/bb.w,(r.height-40)/bb.h);v.k=Math.max(.25,k);v.tx=(r.width-bb.w*v.k)/2-bb.x*v.k;v.ty=(r.height-bb.h*v.k)/2-bb.y*v.k}render()}

/* ---------- pointer interaction ---------- */
function world(ev){var v=views[cur],r=svg.getBoundingClientRect();return {x:(ev.clientX-r.left-v.tx)/v.k,y:(ev.clientY-r.top-v.ty)/v.k}}
svg.addEventListener('pointerdown',function(ev){
  if(ev.button!==0)return;svg.focus();
  var t=ev.target,gh=t.closest&&t.closest('[data-h]'),g=t.closest&&t.closest('[data-id]'),id=g&&g.dataset.id,w=world(ev);
  if(tool){
    if(id&&find(id)){
      if(!linkFrom){linkFrom=id;render();$('uml-hint').textContent='Now click the target element.'}
      else if(linkFrom===id&&!E[tool].self){status('Choose a different target.')}
      else{var b=snap(),e={id:uid('e'),kind:tool,from:linkFrom,to:id,label:'',m1:'',m2:'',y:E[tool].seq?Math.max(20,snapv(w.y)):0};doc().edges.push(e);var kk=tool;commit(b,'Added '+E[kk].l);sel=[e.id];setTool(null)}
    }return;
  }
  if(gh&&id){var n=find(id);drag={mode:'resize',before:snap(),sx:ev.clientX,sy:ev.clientY,n:n,w0:n.w,h0:n.h};svg.setPointerCapture(ev.pointerId);return}
  var ed0=id&&findE(id);
  if(ed0&&E[ed0.kind].seq&&!ev.shiftKey){sel=[id];render();drag={mode:'edgey',before:snap(),sy:ev.clientY,e:ed0,y0:ed0.y||160,moved:false};svg.setPointerCapture(ev.pointerId);return}
  if(id){
    if(ev.shiftKey){sel=sel.indexOf(id)>=0?sel.filter(function(x){return x!==id}):sel.concat(id);render();return}
    if(sel.indexOf(id)<0){sel=[id];render()}
    var top=sel.map(find).filter(Boolean),set=[];top.forEach(function(n){if(set.indexOf(n)<0)set.push(n);desc(n).forEach(function(c){if(set.indexOf(c)<0)set.push(c)})});
    drag={mode:'move',before:snap(),sx:ev.clientX,sy:ev.clientY,set:set,top:top,orig:set.map(function(n){return [n.x,n.y]}),moved:false};
    if(top.length)svg.setPointerCapture(ev.pointerId);
    return;
  }
  sel=[];render();var v=views[cur];drag={mode:'pan',sx:ev.clientX,sy:ev.clientY,tx:v.tx,ty:v.ty};svg.setPointerCapture(ev.pointerId);$('uml-canvas').classList.add('pan');
});
svg.addEventListener('pointermove',function(ev){
  if(!drag)return;var v=views[cur],dx=(ev.clientX-drag.sx)/v.k,dy=(ev.clientY-drag.sy)/v.k;
  if(drag.mode==='pan'){v.tx=drag.tx+ev.clientX-drag.sx;v.ty=drag.ty+ev.clientY-drag.sy;vp.setAttribute('transform','translate('+v.tx+','+v.ty+') scale('+v.k+')')}
  else if(drag.mode==='move'){if(!drag.moved&&Math.abs(dx)+Math.abs(dy)<3/v.k)return;drag.moved=true;drag.set.forEach(function(n,i){n.x=snapv(drag.orig[i][0]+dx);n.y=snapv(drag.orig[i][1]+dy)});layer.innerHTML='';paint(layer,false)}
  else if(drag.mode==='edgey'){if(Math.abs(dy)<2)return;drag.moved=true;drag.e.y=Math.max(20,snapv(drag.y0+dy));layer.innerHTML='';paint(layer,false)}
  else if(drag.mode==='resize'){var n=drag.n;n.w=Math.max(60,snapv(drag.w0+dx));if(K[n.kind].box||K[n.kind].fh)n.h=Math.max(K[n.kind].sh==='bar'?6:K[n.kind].sh==='plain2'?20:30,snapv(drag.h0+dy));layer.innerHTML='';paint(layer,false)}
});
function endDrag(ev){
  if(!drag)return;var d=drag;drag=null;$('uml-canvas').classList.remove('pan');
  try{svg.releasePointerCapture(ev.pointerId)}catch(e){}
  if(d.mode==='move'&&d.moved){var tops=d.top.filter(function(n){return !d.top.some(function(o){return o!==n&&desc(o).indexOf(n)>=0})});tops.forEach(adopt);commit(d.before,'Moved');render()}
  else if(d.mode==='edgey'){if(d.moved){commit(d.before,'Message moved');}render()}
  else if(d.mode==='resize'){commit(d.before,'Resized');render()}
  else if(d.mode==='move'){props()}
}
svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag);
svg.addEventListener('click',function(ev){var g=ev.target.closest&&ev.target.closest('.uedge');if(g&&!tool){sel=[g.dataset.id];render()}});
svg.addEventListener('dblclick',function(ev){var g=ev.target.closest&&ev.target.closest('.unode');if(g){var f=find(g.dataset.id);sel=[g.dataset.id];render();var el=K[f.kind].sh==='note'?$('up-text'):$('up-name');el.focus();el.select()}});
svg.addEventListener('wheel',function(ev){if(!(ev.ctrlKey||ev.metaKey))return;ev.preventDefault();var r=svg.getBoundingClientRect();zoom(ev.deltaY<0?1.1:1/1.1,ev.clientX-r.left,ev.clientY-r.top)},{passive:false});
// palette: click / drag
document.addEventListener('click',function(ev){
  var pb=ev.target.closest&&ev.target.closest('.uml-pbtn[data-kind]');if(pb){addNode(pb.dataset.kind);return}
  var eb=ev.target.closest&&ev.target.closest('[data-edge]');if(eb){setTool(tool===eb.dataset.edge?null:eb.dataset.edge);return}
  var tb=ev.target.closest&&ev.target.closest('.uml-tab');if(tb){switchTo(tb.dataset.d);return}
  var b=ev.target.closest&&ev.target.closest('[data-uml]');if(!b||b.disabled)return;
  ({undo:doUndo,redo:doRedo,dup:dup,del:del,zin:function(){zoom(1.2)},zout:function(){zoom(1/1.2)},fit:fitView,z100:function(){var v=views[cur];zoom(1/v.k)},
    svg:exportSVG,png:exportPNG,json:exportJSON,imp:function(){$('uml-file').click()},
    reset:function(){var b2=snap();var bk=cur;delete docs[bk];build(bk);sel=[];commit(b2,'Restored the sample '+bk+' diagram');fitView()},
    clear:function(){var b2=snap();doc().nodes=[];doc().edges=[];sel=[];commit(b2,'Cleared the canvas');render()},
    swap:function(){var e=findE(sel[0]);if(!e)return;var b2=snap(),t=e.from;e.from=e.to;e.to=t;t=e.m1;e.m1=e.m2;e.m2=t;commit(b2,'Direction reversed');render()},
    edel:del
  })[b.dataset.uml]();
});
svg.addEventListener('dragover',function(e){e.preventDefault()});
svg.addEventListener('drop',function(e){var k=e.dataTransfer.getData('text/uml');if(!K[k])return;e.preventDefault();var w=world(e);addNode(k,w.x-K[k].w/2,w.y-10)});
document.addEventListener('dragstart',function(e){var pb=e.target.closest&&e.target.closest('.uml-pbtn[data-kind]');if(pb){e.dataTransfer.setData('text/uml',pb.dataset.kind);e.dataTransfer.effectAllowed='copy'}});
$('uml-snap').addEventListener('change',function(){snapOn=this.checked});

document.addEventListener('keydown',function(e){
  var typing=/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);if(typing)return;
  if(!e.target.closest||!e.target.closest('.uml-wrap,.uml-bar')){if(!((e.ctrlKey||e.metaKey)&&/^[zy]$/i.test(e.key)))return}
  var k=e.key;
  if((e.ctrlKey||e.metaKey)){var l=k.toLowerCase();
    if(l==='z'){e.preventDefault();e.shiftKey?doRedo():doUndo()}else if(l==='y'){e.preventDefault();doRedo()}
    else if(l==='d'){e.preventDefault();dup()}else if(l==='a'){e.preventDefault();sel=doc().nodes.map(function(n){return n.id});render()}return}
  if(k==='Escape'){if(tool)setTool(null);else setSel([])}
  else if(k==='Delete'||k==='Backspace'){e.preventDefault();del()}
  else if(/^Arrow/.test(k)&&sel.length){e.preventDefault();var b=snap(),st=e.shiftKey?50:10,dx=k==='ArrowLeft'?-st:k==='ArrowRight'?st:0,dy=k==='ArrowUp'?-st:k==='ArrowDown'?st:0;
    var set=[];sel.map(find).filter(Boolean).forEach(function(n){if(set.indexOf(n)<0)set.push(n);desc(n).forEach(function(c){if(set.indexOf(c)<0)set.push(c)})});set.forEach(function(n){n.x+=dx;n.y+=dy});commit(b,'');render()}
});

/* ---------- tabs ---------- */
function ensure(k){if(!docs[k])build(k)}
function switchTo(k){cur=k;ensure(k);sel=[];tool=null;linkFrom=null;[].forEach.call(document.querySelectorAll('.uml-tab'),function(t){t.setAttribute('aria-selected',t.dataset.d===k)});$('uml-canvas').classList.remove('linking');$('uml-hint').textContent='';palette();if(!views[k]){views[k]={};fitView()}else render();save();status('')}

/* ---------- export / import ---------- */
function dl(name,blob){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},800)}
function svgString(){
  var bb=bounds()||{x:0,y:0,w:400,h:300},s=S('svg',{xmlns:NS,viewBox:bb.x+' '+bb.y+' '+bb.w+' '+bb.h,width:bb.w,height:bb.h,'font-family':FONT});
  s.appendChild(defs());s.appendChild(S('rect',{x:bb.x,y:bb.y,width:bb.w,height:bb.h,fill:'#fff'}));var g=S('g',{});s.appendChild(g);
  var sv=sel;sel=[];paint(g,true);sel=sv;return {s:new XMLSerializer().serializeToString(s),w:bb.w,h:bb.h};
}
function exportSVG(){var r=svgString();dl('uml-'+cur+'.svg',new Blob([r.s],{type:'image/svg+xml'}));status('Exported SVG')}
function exportPNG(){
  var r=svgString(),img=new Image(),u=URL.createObjectURL(new Blob([r.s],{type:'image/svg+xml;charset=utf-8'}));
  img.onload=function(){try{var c=document.createElement('canvas');c.width=r.w*2;c.height=r.h*2;var x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(img,0,0,c.width,c.height);c.toBlob(function(b){dl('uml-'+cur+'.png',b);status('Exported PNG')})}catch(e){status('PNG export failed — use SVG instead.')}URL.revokeObjectURL(u)};
  img.onerror=function(){status('PNG export failed — use SVG instead.');URL.revokeObjectURL(u)};img.src=u;
}
function exportJSON(){dl('uml-'+cur+'.json',new Blob([JSON.stringify({diagram:cur,nodes:doc().nodes,edges:doc().edges},null,2)],{type:'application/json'}));status('Exported JSON')}
function cleanDoc(raw){
  if(!raw||!Array.isArray(raw.nodes))return null;var d={nodes:[],edges:[],uid:0},map={};
  function num(v,a,b,df){v=+v;return isFinite(v)?Math.min(b,Math.max(a,v)):df}
  function str(v,n){return String(v==null?'':v).slice(0,n)}
  function arr(v){return Array.isArray(v)?v.slice(0,40).map(function(s){return str(s,100)}):[]}
  raw.nodes.slice(0,300).forEach(function(r){if(!r||!K[r.kind])return;var k=K[r.kind],n={id:'n'+(++d.uid),kind:r.kind,x:num(r.x,-5000,5000,0),y:num(r.y,-5000,5000,0),w:num(r.w,14,1200,k.w),h:num(r.h,0,1200,k.h||0),name:str(r.name,80),stereo:str(r.stereo,40),attrs:arr(r.attrs),methods:arr(r.methods),text:str(r.text,400),color:/^#[0-9a-f]{6}$/i.test(r.color||'')?r.color:'',abs:!!r.abs,parent:null,_o:r.id,_p:r.parent};map[r.id]=n;d.nodes.push(n)});
  d.nodes.forEach(function(n){if(n._p&&map[n._p]&&map[n._p]!==n)n.parent=map[n._p].id;delete n._o;delete n._p});
  (Array.isArray(raw.edges)?raw.edges:[]).slice(0,600).forEach(function(r){if(r&&E[r.kind]&&map[r.from]&&map[r.to]&&(r.from!==r.to||E[r.kind].self))d.edges.push({id:'e'+(++d.uid),kind:r.kind,from:map[r.from].id,to:map[r.to].id,label:str(r.label,60),m1:str(r.m1,12),m2:str(r.m2,12),y:num(r.y,0,5000,0)})});
  return d;
}
$('uml-file').addEventListener('change',function(){
  var f=this.files[0];this.value='';if(!f)return;if(f.size>2e6){status('File too large (max 2 MB).');return}
  var rd=new FileReader();rd.onload=function(){var d;try{d=cleanDoc(JSON.parse(String(rd.result)))}catch(e){d=null}
    if(!d){status('Not a valid diagram JSON file.');return}var b=snap();docs[cur]=d;sel=[];commit(b,'Imported '+d.nodes.length+' elements');fitView()};rd.readAsText(f);
});

/* ---------- init ---------- */
(function(){
  var s=null;try{s=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}
  if(s&&s.docs){Object.keys(s.docs).forEach(function(k){if(TPL[k]){var d=cleanDoc(s.docs[k]);if(d)docs[k]=d}});if(s.cur&&TPL[s.cur])cur=s.cur}
  var tabs=$('uml-tabs');['Structural','Behavioral'].forEach(function(gn){var grp=document.createElement('div');grp.className='uml-tabgrp';var lb=document.createElement('span');lb.className='uml-tabgl';lb.textContent=gn;grp.appendChild(lb);DIAGS.filter(function(d){return d.g===gn}).forEach(function(d){var b=document.createElement('button');b.type='button';b.className='uml-tab';b.dataset.d=d.k;b.setAttribute('role','tab');b.textContent=d.l;grp.appendChild(b)});tabs.appendChild(grp)});
  switchTo(cur);
})();
})();
