/* 
* @Author: Qi JianWei
* @Date:   2017-06-11 11:45:35
* @Last Modified by:   Qi JianWei
* @Last Modified time: 2017-06-11 11:45:41
*/

    /*  1.获取当前的日期（得到当前年月份信息）
                   date=new Date(); 年份：date.getFullYear(); 月份：date.getMonth();返回0-11的整数; 日期：date.getDate();返回1-31的整数;
               *  2.得到当前年月份对应的天数
                   小技巧： function getCountDays(y,m){
                                var days=new Date(y,m+1,0,0,0,0);
                                return days.getDate();
                              }
                    月份加1，然后日期改成0号,

                    这样就获取当前月份天数，不需要考虑闰年与否，计算机内部已经帮我们转化好;
               *  3.得出日期的对应的星期
               *  4.当前日子的高亮显示
               *
               *  
               */
            window.onload=function(){
               var timeSpan=document.querySelector(".time span");
               var oUl=document.querySelector("#list");       
               var Span=document.querySelector(".tab span");
               var Prev=document.querySelector(".prev");
               var Next=document.querySelector(".next");
               var currentDate=new Date();//当前的date对象，不变
               var date=new Date();
               var aLi=null;

               //备忘录列表
               var notes=document.querySelector(".notes");
               var aLink=document.querySelector(".show-list a");
               var masking=document.querySelector(".masking");
               var notes_list=document.querySelector(".notes-list");
               var notes_list_span=document.querySelectorAll(".notes-list span");
               var notes_list_text=document.querySelector(".doIt p");
              // notes_list.innerHTML="";

               //备忘录输入
               var notes_title=document.querySelector(".notes-title input");
               var notes_detial=document.querySelector(".detail textarea");
               var notes_time=document.querySelector(".notes-time input");
               var btn1=document.querySelector(".btn1");
               var btn2=document.querySelector(".btn2");
               var str="";
               var str2="";
               var arr=[];//存储所有备忘录数据
               aLink.onclick=function(){
                     notes.style.display='block';
                     masking.style.display='block';
                }
       
               
               //留言记事部分
               var arr=[
                {
                   title:'今天干啥呢',
                   date:'2017-03-01',
                   time:'12:04',
                   text:'今天先约会，看电影，然后吃饭'

                },
                {
                   title:'吃货节',
                   date:'2017-04-08',
                   time:'15:04',
                   text:'今天先约会，看电影，然后吃饭'

                 },
                 {
                   title:'相亲',
                   date:'2017-04-20',
                   time:'08:04',
                   text:'今天去太平洋吃个小火锅'

                 },
                 {
                   title:'清明节',
                   date:'2017-04-09',
                   time:'12:04',
                   text:'今天给老祖宗扫个墓'

                 }, 
                 {
                   title:'相亲',
                   date:'2017-04-04',
                   time:'15:04',
                   text:'今天去太平洋吃个小火锅'

                 },
                 {
                   title:'吃货',
                   date:'2017-04-09',
                   time:'19:04',
                   text:'今天先约会，看电影，然后吃饭'

                 },
                 {
                   title:'图书馆',
                   date:'2017-04-09',
                   time:'18:04',
                   text:'杭州市民中心借阅书籍'

                 }   
               ];
               //便利签
               var sticky_notes=document.querySelector(".sticky-notes");
             //  sticky_notes.innerHTML="";
  
               //计算当时间
               timeSpan.innerHTML=toDouble(currentDate.getHours())+':'+toDouble(currentDate.getMinutes())
                                  +':'+toDouble(currentDate.getSeconds());

               /*开启定时器，不断获取时间渲染*/
               setInterval(function(){
                    currentDate=new Date();
                    timeSpan.innerHTML=toDouble(currentDate.getHours())+':'+toDouble(currentDate.getMinutes())
                                  +':'+toDouble(currentDate.getSeconds());
                    //渲染备忘录在日历中的标记；              
                    aLi=Array.from(oUl.querySelectorAll(".currentMonth"));
                    showPoint(arr,aLi); 

               },500);  

               show(date);

               //备忘录取消按钮
               btn1.onclick=function(){
                  notes.style.display='none';
                  masking.style.display='none';
               }
                
              //备忘录确定按钮点击
               btn2.onclick=function(){  
                    var  time1=notes_time.value.substring(0,10);
                    var  time2=notes_time.value.substring(11); 
                    var  text1=notes_title.value;
                    var  mainText=notes_detial.value;
                    arr.push({
                       title:text1,
                       date:time1,
                       time:time2,
                       text:mainText 
                    });
                    str=`<li>
                             <div class="times">
                                 <span>${time2}</span> 
                                 <span>${time1}</span> 
                             </div>
                             <div class="doIt">
                                 <p>${text1}</p>
                                 <p>${mainText}</p>  
                             </div>      
                           </li>`;
                    str2=`<li><a href="#">
                              <h2>${text1}</h2>
                              <span>${time1}</span>  <span>${time2}</span>
                              <p>${mainText}</p>
                              </a></li>` ;      
                   notes_list.innerHTML+=str;
                   sticky_notes.innerHTML+=str2;
                   notes.style.display='none';
                   masking.style.display='none';
                }

                /*渲染添加的新事件 ,并且检测日历点击事件*/
               function showPoint(Arr,aLi){
                      aLi.forEach(function(element,index){
                          var k=Span.innerHTML+'-'+ toDouble(parseInt(element.innerHTML)); 
                          for(var i=0;i<arr.length;i++){
                              if(arr[i].date==k){
                                element.className+=" "+"test";
                               
                             }
                          } 
                          element.onclick=function(){ 
                               notes_list.innerHTML=""; 
                               sticky_notes.innerHTML="";                                
                               var k=Span.innerHTML+'-'+ toDouble(parseInt(element.innerHTML));            
                               for(var i=0;i<arr.length;i++){
                                   if(arr[i].date==k){
                                      //先将所有li边框去掉，给当前加红色边框
                                      aLi.forEach(function(element,index){
                                         element.style.border="none";
                                         element.style.width="20px";
                                         element.style.height="20px";   

                                      });
                                      //点击的，且有备忘事项，加红色边框
                                      element.style.border="2px solid red";
                                      element.style.width="16px";
                                      element.style.height="16px";


                                      notes_list.innerHTML+=`<li>
                                                                 <div class="times">
                                                                     <span>${arr[i].time}</span> 
                                                                     <span>${arr[i].date}</span> 
                                                                 </div>
                                                                 <div class="doIt">
                                                                     <p>${arr[i].title}</p>
                                                                     <p>${arr[i].text}</p>  
                                                                 </div>      
                                                              </li>`;
                              sticky_notes.innerHTML+= `<li>
                                                       <a href="#">
                                                       <h2>${arr[i].title}</h2>
                                                       <span>${arr[i].date}</span>  <span>${arr[i].time}</span>
                                                       <p>${arr[i].text}</p>
                                                       </a>
                                                     </li>` ;                         
                                    }
                                }
                            }                    
                     });    
                 }
          


               Next.onclick=function(){
                 oUl.innerHTML="";
                 Span.innerHTML="";
                 date=new Date(date.getFullYear(),date.getMonth()+1);     
                 show(date); 
               }
               Prev.onclick=function(){
                 oUl.innerHTML="";
                 Span.innerHTML="";
                 date=new Date(date.getFullYear(),date.getMonth()-1);   
                 show(date); 
                
               }
               
               /**
                * [show 渲染]
                * @param  {[type]} dateNow [description]
                * @return {[type]}         [description]
                *  getDay(),返回0-6的整数;0代表星期天
                */
               function show(dateNow){  
                   //获取1号对应的星期           
                   var firstWeek= new Date(dateNow.getFullYear(),dateNow.getMonth(),1).getDay();
                   var countdays=getCountDays(dateNow.getFullYear(),dateNow.getMonth());
                   Span.innerHTML=dateNow.getFullYear()+'-'+toDouble((dateNow.getMonth()+1));
                   for(var i=1;i<=42;i++){
                        var str="";
                        var v=i-firstWeek; 
                        var d1=new Date(dateNow.getFullYear(),dateNow.getMonth(),v).getDate();  

                        if(v<=0||v>countdays){                      
                           str=`<li class="otherMonth">${d1}</li>`;
                        }else if(v==currentDate.getDate()&&currentDate.getMonth()==dateNow.getMonth()&&currentDate.getFullYear()==dateNow.getFullYear()){
                           str=`<li class="today currentMonth">${d1}</li>`;
                        }else{
                           str=`<li class="currentMonth">${d1}</li>`;
                        }
                        oUl.innerHTML+=str;  
                   } 
                    aLi=Array.from(oUl.querySelectorAll(".currentMonth"));  
                }  

             
               /**（快捷键是：/** + tab）;
                * [getCountDays 获取当前月份对应的日期 ]
                * @param  {[type]} y [年份]
                * @param  {[type]} m [月份]
                * @return {[type]}   [返回对应年月的天数]
                */
              
               function getCountDays(y,m){
                 var days=new Date(y,m+1,0);
                 return days.getDate();

               }         

               /**将时间转换成两位数   
                  返回的类型是字符串;
               **/
               function toDouble(n){
                 
                  return n<10?'0'+n:''+n;  
               }
              
         }