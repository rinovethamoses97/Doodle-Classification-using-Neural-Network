println("Reading");
size(280,280);
int total=1000;
byte[] data=loadBytes("rainbow.npy");
byte[] output=new byte[total*784];
int outindex=0;
println(data.length);
for(int j=0;j<total;j++){
  int start=80+j*784;
  PImage img=createImage(28,28,RGB);
  img.loadPixels();
  for(int i=0;i<784;i++){
    int index=i+start;
    int val=data[index];
    byte temp=data[index];
    output[outindex]=temp;
    img.pixels[i]=color(255-val & 0xff);
    outindex++;

  }
  img.updatePixels();
  int imgx=28*(j%10);
  int imgy=28*int(j/10);
  image(img,imgx,imgy);  
}
saveBytes("rainbow1000.bin",output);
