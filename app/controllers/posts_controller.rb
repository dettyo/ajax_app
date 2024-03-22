class PostsController < ApplicationController
  def index
    @posts = Post.order(id: "DESC")
  end

  def new
  end

  def create
    post = Post.create(content: params[:content])
    render json:{ post: post } #"json:"はjson option。
    #変数postの値を、postというキーとセットでJavaScriptに送信
    #JavaScriptでは受け取った変数postを使用して、メモをブラウザに反映
    #redirect_to action: :index
  end
end
