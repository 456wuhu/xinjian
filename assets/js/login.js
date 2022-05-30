$(function(){
    //隐藏显示界面
    $('#link_reg').click(()=>{
        $('.login-box').hide();
        $('.reg-box').show()
    });
    $('#link_login').click(()=>{
        $('.login-box').show();
        $('.reg-box').hide()
    })
    type="password"
    name="repassword"
    const form =layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/,"密码必须6-12位"],
        repwd:(value)=>{
            const pwd=$('#form_reg [name=password]').val();
            if(pwd !== value) return'两次密码不一致'
        }
    })
    const layer = layui.layer;
    // const baseUrl="http://www.liulongbin.top:3007";
    $('#form_reg').on('submit',(e)=>{
        e.preventDefault();
        $.ajax({
            type:'post',
            url:  "/api/reguser",
            data:{
                username: $("#form_reg [name=username").val(),
                password: $("#form_reg [name=password").val(),
            },
            success: res => {
                if (res.status !== 0) return layer.msg(res.message);
              layer.msg('注册成功了');
              $("#link_login").click();
            }
        })
    })
    $('#form_login').submit((e)=>{
        e.preventDefault()
        $.ajax({
            type:'post',
            url:"/api/login",
            data:$('#form_login').serialize(),
            success: (res) => {
                if(res.status !== 0) return layer.msg(res.message);
                layer.msg('登入成功!');
                localStorage.setItem("token", res.token);
                // 跳转到主页
                location.href = "/index.html";
            }
        })
        
    })
})
