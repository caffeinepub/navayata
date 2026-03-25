import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  // Kept from previous version to avoid stable variable discard errors
  let accessControlState = AccessControl.initState();
  type UserProfile = { name : Text; email : Text; address : Text };
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Use prefabricated storage system
  include MixinStorage();

  let products = Map.empty<Text, Product>();
  var nextId = 2;
  var fee : Nat = 5000;

  let ADMIN_PASSWORD : Text = "NAVAYATA@#2025";

  type Product = {
    name : Text;
    id : Text;
    price : Nat;
    contents : Text;
    image : Storage.ExternalBlob;
  };

  public shared func addProduct(name : Text, price : Nat, contents : Text, image : Storage.ExternalBlob) : async () {
    let id = nextId.toText();
    nextId += 1;
    let product : Product = { name; id; price; contents; image };
    products.add(id, product);
  };

  public shared func removeProduct(id : Text) : async Product {
    let product = products.get(id);
    products.remove(id);
    switch (product) {
      case (null) { Runtime.trap("Product does not exist!") };
      case (?p) { p };
    };
  };

  public shared func modifyProduct(product : Product) : async () {
    if (not products.containsKey(product.id)) {
      Runtime.trap("Product does not exist!");
    };
    products.add(product.id, product);
  };

  public shared func setFee(newFee : Nat) : async () {
    fee := newFee;
  };

  public query func verifyAdminPassword(password : Text) : async Bool {
    password == ADMIN_PASSWORD;
  };

  public query func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProductById(productId : Text) : async ?Product {
    products.get(productId);
  };

  public query func getFee() : async Nat {
    fee;
  };
};
