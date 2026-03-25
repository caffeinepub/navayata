import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  // Use prefabricated authentication system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Use prefabricated storage system
  include MixinStorage();

  let products = Map.empty<Text, Product>();
  var nextId = 2;
  var fee : Nat = 5000;

  type Product = {
    name : Text;
    id : Text;
    price : Nat;
    contents : Text;
    image : Storage.ExternalBlob;
  };

  // User profile type as required by instructions
  public type UserProfile = {
    name : Text;
    email : Text;
    address : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Allow first caller to claim admin if no admins exist yet
  public shared ({ caller }) func claimFirstAdmin() : async Bool {
    if (accessControlState.adminAssigned) {
      return false; // admin already exists, cannot claim
    };
    AccessControl.assignRole(accessControlState, caller, caller, #admin);
    true;
  };

  // Check if any admin exists
  public query func hasAnyAdmin() : async Bool {
    accessControlState.adminAssigned;
  };

  // Product management functions (admin-only)
  public shared ({ caller }) func addProduct(name : Text, price : Nat, contents : Text, image : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let id = nextId.toText();
    nextId += 1;
    let product : Product = {
      name;
      id;
      price;
      contents;
      image;
    };
    products.add(id, product);
  };

  public shared ({ caller }) func removeProduct(id : Text) : async Product {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let product = products.get(id);
    products.remove(id);
    switch (product) {
      case (null) { Runtime.trap("Product does not exist!") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func modifyProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not products.containsKey(product.id)) {
      Runtime.trap("Product does not exist!");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func setFee(newFee : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    fee := newFee;
  };

  // Public query functions (no authorization needed)
  public query ({ caller }) func getAllProducts() : async [Product] {
    ignore caller;
    products.values().toArray();
  };

  public query ({ caller }) func getProductById(productId : Text) : async ?Product {
    ignore caller;
    products.get(productId);
  };

  public query ({ caller }) func getFee() : async Nat {
    ignore caller;
    fee;
  };
};
